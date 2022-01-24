package com.example.server.controller;

import com.example.server.constant.JwtConstant;
import com.example.server.domain.Employee;
import com.example.server.domain.Person;
import com.example.server.domain.PersonalDocument;
import com.example.server.security.CookieUtil;
import com.example.server.security.JwtUtil;
import com.example.server.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@RestController
@CrossOrigin(origins = "http://localhost:4200",allowedHeaders = "*", allowCredentials = "true")
public class EmployeeVisaController {

    @Autowired
    PersonalDocService personalDocService;
    @Autowired
    AWSS3Service service;
    @Autowired
    PersonService personService;
    @Autowired
    EmployeeService employeeService;
    @Autowired
    VisaStatusService visaStatusService;
    @Autowired
    AppWorkFlowService appWorkFlowService;


    @PostMapping(value= "/uploadVisa/{doc}/{fileName}")
    public ResponseEntity<String> uploadFile(@PathVariable String doc,
                                             @PathVariable String fileName,
                                             HttpServletRequest request) {
        String token = CookieUtil.getValue(request, JwtConstant.JWT_COOKIE_NAME);

        Integer userId = JwtUtil.getUserIdFromJwt(token);
        System.out.println("user id"+ userId);

        Person person = personService.findByUserId(userId);

        Employee employee = employeeService.findByPersonId(person.getId());
        System.out.println("person id"+ person);
        System.out.println("employee id"+ employee);
//        final String response = service.uploadFile(multipartFile);

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        PersonalDocument personalDocument = new PersonalDocument().builder()
                .employeeId(employee.getId())
                .name(doc)
                .path(fileName)
                .comment("")
                .createDate(now.toString())
                .createUserId(userId)
                .build();


        System.out.println(person.getId()+ " pid");
        System.out.println(userId+ " uid");


        personalDocService.save(personalDocument);
        return new ResponseEntity<>(fileName, HttpStatus.OK);
    }


    @RequestMapping(value = "/visa",method = RequestMethod.GET)
    public ResponseEntity<?> getType(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/userVisa",method = RequestMethod.GET)
    public ResponseEntity getUserId(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String token = CookieUtil.getValue(request, JwtConstant.JWT_COOKIE_NAME);

        System.out.println(token+" Token");
        System.out.println(request+" request");

        Integer userId = JwtUtil.getUserIdFromJwt(token);
        System.out.println(userId+" :id");
        return new ResponseEntity(userId,HttpStatus.OK);
    }

    @RequestMapping(value = "/updateStatus/{userId}/{nextStatus}/{nextStep}",method = RequestMethod.POST)
    public ResponseEntity<?> updateStatus(@PathVariable int userId, @PathVariable String nextStatus, @PathVariable String nextStep){
        try {
            System.out.println("In updateStatus: ");
            System.out.println("need to nextStatus: "+nextStatus);
            appWorkFlowService.updateStatusVisa(userId, nextStatus);
            System.out.println("need to nextStep: "+nextStep);
            appWorkFlowService.updateStep(userId, nextStep);
            appWorkFlowService.deleteComment(userId);
            return new ResponseEntity<>("Approve User", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("No such user id", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/updateStep/{userId}/{nextStep}",method = RequestMethod.POST)
    public ResponseEntity<?> updateStep(@PathVariable int userId, @PathVariable String nextStep){
        try {
            System.out.println("In updateStep: ");
            System.out.println("need to update: "+nextStep);
            appWorkFlowService.updateStep(userId, nextStep);
            return new ResponseEntity<>("Approve User", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("No such user id", HttpStatus.BAD_REQUEST);
        }
    }
}
