package com.example.springssoauthserver.controller;

import com.example.springssoauthserver.constant.JwtConstant;
import com.example.springssoauthserver.domain.*;
import com.example.springssoauthserver.security.CookieUtil;
import com.example.springssoauthserver.security.JwtUtil;
import com.example.springssoauthserver.service.AWSS3Service;
import com.example.springssoauthserver.service.TokenService;
import com.example.springssoauthserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.*;
import javax.mail.MessagingException;
import javax.mail.internet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.*;

/**
 * Work flow
 * 1. User uses authentication page to send email(in HTTP request body to backend)
 * 2. Backend receives request, parses request body and generates RegistrationToken based on email, store token in database
 * 3. Backend sends email to user email containing registration url with hashed token as path variable
 * 4. User can access the registration page until token expires
 * 5. (TBD) Registration process
 * 6. User uses login page to enter login credentials(contains username, password, isHr) and send request to backend
 * 7. Backend checks credentials, generates cookie containing JWT token and sends response back to front end
 */

@RestController
@CrossOrigin(origins = "http://localhost:4200",allowedHeaders = "*", allowCredentials = "true")
public class MainController {

    @Autowired
    UserService userService;
    @Autowired
    TokenService tokenService;

    @Autowired
    private AWSS3Service service;

    RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/logout")
    public void logout(HttpServletResponse res) {
        CookieUtil.clear(res, JwtConstant.JWT_COOKIE_NAME, "localhost");
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(HttpServletResponse response, @RequestBody Map<String, Object> payload){
        System.out.println(payload.toString());
        try{
            User user = userService.checkLogin(payload.get("username").toString(),payload.get("password").toString());
            if(user!= null){
                ErrorMsg error = new ErrorMsg();
                error.setError("Username taken, please use another username!");
                return new ResponseEntity<ErrorMsg>(error,HttpStatus.BAD_REQUEST);
            }

            userService.register(payload.get("username").toString(),payload.get("password").toString(), payload.get("email").toString());
            user = userService.checkLogin(payload.get("username").toString(),payload.get("password").toString());
            payload.put("userId",user.getId());
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
            ResponseEntity<String> res = restTemplate.postForEntity("http://localhost:8081/register", entity, String.class);
            return null;
        }
        catch (Exception e){
            return null;
        }
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<?> login(HttpServletResponse res, @RequestBody Account account){
        //parse account based on JSON sent from frontend
        String username = account.getUsername();
        String password = account.getPassword();
        String isHr = account.getIsHr();

        User user = userService.checkLogin(username,password);

        if(user == null){
            ErrorMsg error = new ErrorMsg();
            error.setError("Wrong username or password!");
            return new ResponseEntity<ErrorMsg>(error,HttpStatus.BAD_REQUEST);
        }

        System.out.println("Acc===" + account.toString());

        //Kylan: get userRoleId by username
        int userRoleId = userService.getUserRoleId(username);
        int userFlag = userService.getUserActivateFlag(username);

        System.out.println("role id: " + userRoleId);
        System.out.println("isHR: " + isHr);

        int roleHr = isHr.equals("true")? 1:0;

        //Kylan: check userRoleId, 2 is hr, 1 is user.
        if (userRoleId == 2){
            System.out.println("Login successfully!");
            String jwt = JwtUtil.generateToken(username, JwtConstant.JWT_VALID_DURATION,user.getEmail(),user.getId(), roleHr);
            CookieUtil.create(res, JwtConstant.JWT_COOKIE_NAME, jwt, false, -1, "localhost");
            System.out.println("JWT login: "+jwt);
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setRedirectUrl(jwt);
            loginResponse.setIsHr("true");
//            return new ResponseEntity<>(res, HttpStatus.OK);
            return new ResponseEntity<LoginResponse>(loginResponse, HttpStatus.OK);
        } else if (userFlag == 0){
            ErrorMsg error = new ErrorMsg();
            error.setError("Please wait for approval!");
            return new ResponseEntity<ErrorMsg>(error,HttpStatus.BAD_REQUEST);
        }
        else if (userRoleId == 1 && isHr.equals("true")){

            ErrorMsg error = new ErrorMsg();
            error.setError("You are not HR!");
            return new ResponseEntity<ErrorMsg>(error,HttpStatus.BAD_REQUEST);

        } else {
            System.out.println("Login successfully as employee");
            System.out.println(user.getCreateDate());
            String jwt = JwtUtil.generateToken(username, JwtConstant.JWT_VALID_DURATION,user.getEmail(),user.getId(), roleHr);
            CookieUtil.create(res, JwtConstant.JWT_COOKIE_NAME, jwt, false, -1, "localhost");
            System.out.println("JWT login: "+jwt);
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setRedirectUrl(jwt);
            loginResponse.setIsHr("false");
            return new ResponseEntity<LoginResponse>(loginResponse, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/registertoken",method = RequestMethod.POST)
    public void loginToken(@RequestBody Email email){
        try{
            String regisJWT = JwtUtil.generateRegistrationToken(email.getEmail(),JwtConstant.REGISTRATION_VALID_DURATION);
            tokenService.insertRegistrationToken(regisJWT,email.getEmail());
            sendmail(email.getEmail(),regisJWT);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
    }

    //helper function used to send registration link to user email
    private void sendmail(String email, String token) throws AddressException, MessagingException, IOException {
        //smtp email configuration
        System.out.println("Send token: " + token);
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(JwtConstant.EMAIL, JwtConstant.EMAIL_PWD);
            }
        });
        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress(JwtConstant.EMAIL, false));

        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
        msg.setSubject("Registration Link");
        msg.setContent("http://localhost:4200/register/step1/"+token, "text/html;charset=UTF-8");
        msg.setSentDate(new Date());
        Transport.send(msg);
    }

    //AWS S3
    @PostMapping(value= "/upload")
    public ResponseEntity<String> uploadFile(@RequestPart(value= "file") final MultipartFile multipartFile) {
        service.uploadFile(multipartFile);
        final String response = "[" + multipartFile.getOriginalFilename() + "] uploaded successfully.";
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value= "/download")
    public ResponseEntity<ByteArrayResource> downloadFile(@RequestParam(value= "fileName") final String keyName) {
        final byte[] data = service.downloadFile(keyName);
        final ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + keyName + "\"")
                .body(resource);
    }

    //Kylan: token validation for accessing registration link
    @RequestMapping(value = "/token",method = RequestMethod.POST)
    public ResponseEntity<?> validateToken(@RequestBody JwtToken token){
        System.out.println("Token: " + token.getJwt());
        String subject = JwtUtil.getSubjectFromJwtRegistration(token.getJwt());
        System.out.println("sub from token: "+subject);
        if (subject == null){
            ErrorMsg error = new ErrorMsg();
            error.setError("Invalid JWT");
            return new ResponseEntity<ErrorMsg>(error,HttpStatus.BAD_REQUEST);
        } else if (subject.equals("Expired")){
            ErrorMsg error = new ErrorMsg();
            error.setError("Expired!");
            return new ResponseEntity<ErrorMsg>(error,HttpStatus.BAD_REQUEST);
        } else {
            RegisterResponse regRes = new RegisterResponse();
            regRes.setJwt(subject);
            return new ResponseEntity<RegisterResponse>(regRes,HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/approveLogin/{userId}",method = RequestMethod.POST)
    public ResponseEntity<?> approveOnboarding(@PathVariable int userId){
        try {
            userService.setUserFlagActive(userId, 1);
            return new ResponseEntity<>("Approve User", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("No such user id", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/rejectLogin/{userId}",method = RequestMethod.POST)
    public ResponseEntity<?> rejectOnboarding(@PathVariable int userId){
        try {
            userService.setUserFlagActive(userId, 0);
            return new ResponseEntity<>("Approve User", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("No such user id", HttpStatus.BAD_REQUEST);
        }
    }

}
