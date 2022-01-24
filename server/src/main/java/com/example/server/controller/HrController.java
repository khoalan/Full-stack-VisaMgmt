package com.example.server.controller;



import com.example.server.constant.JwtConstant;
import com.example.server.domain.*;
import com.example.server.domain.hr.MyDoc;
import com.example.server.domain.hr.ReviewApplication;
import com.example.server.domain.hr.UserApplication;
import com.example.server.security.CookieUtil;
import com.example.server.service.*;
import com.example.server.service.serviceImpl.HrServiceImpl;
import org.joda.time.Days;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.time.temporal.ChronoUnit;

@RestController
@CrossOrigin(origins = "http://localhost:4200",allowedHeaders = "*", allowCredentials = "true")
public class HrController {

    @Autowired
    private HrServiceImpl hrService;
    @Autowired
    EmployeeService employeeService;
    @Autowired
    PersonService personService;
    @Autowired
    ContactService contactService;
    @Autowired
    AddressService addressService;
    @Autowired
    VisaStatusService visaStatusService;
    @Autowired
    AppWorkFlowService appWorkFlowService;
    @Autowired
    PersonalDocService personalDocService;


    @RequestMapping(value = "/hr/hire",method = RequestMethod.GET)
    public ResponseEntity getVisaStatusTable(HttpServletRequest req){
        String token = CookieUtil.getValue(req, JwtConstant.JWT_COOKIE_NAME);
        System.out.println("Token in hr hire: "+token);

//        Map<String, String> map = new HashMap<String, String>();
//
//        Enumeration headerNames = req.getHeaderNames();
//        while (headerNames.hasMoreElements()) {
//            String key = (String) headerNames.nextElement();
//            String value = req.getHeader(key);
//            map.put(key, value);
//        }
//
//        System.out.println("Headers: " + map);

        if (token != null) {
            List<ApplicationWorkFlow> appList = hrService.getAllAppWorkFlow();
            List<ReviewApplication> reviewAppList = new ArrayList<>();

            for (ApplicationWorkFlow app : appList) {
//            System.out.println("Applist" + app.toString());
                Employee tempEmployee = employeeService.findById(app.getEmployeeId());
//            System.out.println("Emp: "+tempEmployee.toString());
                Person tempPerson = personService.findById(Integer.parseInt(tempEmployee.getPersonId()));
//            System.out.println("Per: "+tempPerson.toString());
                VisaStatus tempVisa = visaStatusService.getVisaByUserId(tempPerson.getUserId());
//            System.out.println("Vis: "+tempVisa.toString());
                SimpleDateFormat dtf = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
                LocalDate dateEnd = LocalDate.parse(tempEmployee.getVisaEndDate());
                Date now = new Date();
                String d = dtf.format(now);
                LocalDate dateStart = LocalDate.parse(d);

                long dayLeft = dateStart.until(dateEnd, ChronoUnit.DAYS);

                ReviewApplication newReview = new ReviewApplication().builder()
                        .firstname(tempPerson.getFirstName())
                        .lastname(tempPerson.getLastName())
                        .workAuth(tempVisa.getVisaType())
                        .status(app.getOnboard())
                        .type(app.getType())
                        .userId(tempPerson.getUserId())
                        .startdate(tempEmployee.getVisaStartDate())
                        .visaExpirationdate(tempEmployee.getVisaEndDate())
                        .dayLeft(String.valueOf(dayLeft))
                        .build();
                reviewAppList.add(newReview);
            }

            return new ResponseEntity(reviewAppList, HttpStatus.OK);
        } else return new ResponseEntity("Err", HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/hr/user/{userId}",method = RequestMethod.GET)
    public ResponseEntity getUserTable(@PathVariable int userId, HttpServletRequest req){

        System.out.println("You are here hr/user/id"+userId);
        Person tempPerson = personService.findByUserId(userId);
//        System.out.println("Per: "+tempPerson.toString());
        Employee tempEmployee = employeeService.findByPersonId(tempPerson.getId());
//        System.out.println("Emp: "+tempEmployee);
        Address tempAddress = addressService.findByPersonId(tempPerson.getId());
//        System.out.println("Add: "+tempAddress);
        VisaStatus tempVisa = visaStatusService.getVisaByUserId(userId);
//        System.out.println("Vis: "+tempVisa.toString());
        PersonalDocument tempDriveDoc = personalDocService.getDocByNameAndId(tempEmployee.getId(), "Driver");

        System.out.println("temid" + tempEmployee.getId());
        System.out.println("temType "+ tempVisa.getVisaType());
        PersonalDocument tempVisaDoc = personalDocService.getDocByNameAndId(tempEmployee.getId(), tempVisa.getVisaType());
//        System.out.println("Temp via Doc: "+tempVisaDoc.getPath().equals(null));

        ApplicationWorkFlow tempApp = hrService.getAppWorkFlowByEmployeeId(tempEmployee.getId());
        List<PersonalDocument> tempDocList = personalDocService.findAllByCreateUserId(userId);
        List<MyDoc> tempVisaTypeDocList = new ArrayList<>();

        for (PersonalDocument doc: tempDocList){
            if (!doc.getName().equals("Driver") && !doc.getName().equals("F1(CPT/OPT)")){
                MyDoc tempVisaTypeDoc = new MyDoc();
                tempVisaTypeDoc.setDocName(doc.getName());
                tempVisaTypeDoc.setDocUrl("https://team-project-beacon.s3.amazonaws.com/"+doc.getPath().toString());
                tempVisaTypeDocList.add(tempVisaTypeDoc);
            }
        }

        System.out.println("visatypedoc: "+tempVisaTypeDocList.toString());

        SimpleDateFormat dtf = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        LocalDate dateEnd = LocalDate.parse(tempEmployee.getVisaEndDate());
        Date now = new Date();
        String d = dtf.format(now);
        LocalDate dateStart = LocalDate.parse(d);

        long dayLeft = dateStart.until(dateEnd, ChronoUnit.DAYS);

        UserApplication newUserApp = new UserApplication().builder()
                .firstname(tempPerson.getFirstName())
                .lastname(tempPerson.getLastName())
                .middlename(tempPerson.getMiddleName())
                .ssn(tempPerson.getSSN())
                .dob(tempPerson.getDOB())
                .gender(tempPerson.getGender())
                .avatar(tempEmployee.getAvartar())
                .cellphone(tempPerson.getCellPhone())
                .workphone(tempPerson.getAlternatePhone())
                .address1(tempAddress.getAddressLine1())
                .address2(tempAddress.getAddressLine2())
                .city(tempAddress.getCity())
                .state(tempAddress.getStateName())
                .zipcode(tempAddress.getZipCode())
                .email(tempPerson.getEmail())
                .licensenum(tempEmployee.getDriverLicense())
                .expirationdate(tempEmployee.getDriverLicenseExpDate())
                .carnum(tempEmployee.getCar())
                .visa(tempVisa.getVisaType())
                .startdate(tempEmployee.getVisaStartDate())
                .visaExpirationdate(tempEmployee.getVisaEndDate().equals(null)?"":tempEmployee.getVisaEndDate())
                .visaDoc(tempVisaDoc.getPath().equals(null)?"":tempVisaDoc.getPath())
                .driverLicense(tempDriveDoc.getPath())
                .type(tempApp.getType())
                .status(tempApp.getStatus())
                .visaTypeDoc(tempVisaTypeDocList)
                .comment(tempApp.getComments())
                .dayLeft(dayLeft)
                .build();
            return new ResponseEntity(newUserApp, HttpStatus.OK);
    }

    //GET DOCUMENT BY USERID

    @RequestMapping(value = "/approveOnboard/{userId}",method = RequestMethod.POST)
    public ResponseEntity<?> approveOnboarding(@PathVariable int userId){
        try {
            appWorkFlowService.updateStatusOnboard(userId, "Complete");
            return new ResponseEntity<>("Approve User", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("No such user id", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/rejectOnboard/{userId}",method = RequestMethod.POST)
    public ResponseEntity<?> rejectOnboarding(@PathVariable int userId){
        try {
            appWorkFlowService.updateStatusOnboard(userId, "Pending");
            return new ResponseEntity<>("Approve User", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("No such user id", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/approveVisa/{userId}",method = RequestMethod.POST)
    public ResponseEntity<?> approveVisa(@PathVariable int userId){
        try {
            System.out.println("In approveVisa: ");
            appWorkFlowService.updateStatusVisa(userId, "Approved");
            return new ResponseEntity<>("Approve User", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("No such user id", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/rejectVisa/{userId}/{wrongDoc}",method = RequestMethod.POST)
    public ResponseEntity<?> rejectVisa(@PathVariable int userId, @PathVariable String wrongDoc){
        try {
            System.out.println("In rejectVisa: ");
            System.out.println("Wrongdoc: "+wrongDoc);
            appWorkFlowService.updateStatusVisa(userId, "Rejected");
            personalDocService.removeWrongDoc(userId, wrongDoc);
            return new ResponseEntity<>("Approve User", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("No such user id", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/comment/{userId}",method = RequestMethod.POST)
    public ResponseEntity<?> addComment(@PathVariable int userId, @RequestBody String comment){
        try {

            System.out.println("User: "+userId+":"+comment);
            appWorkFlowService.setComment(userId, comment);
            return new ResponseEntity<>("Approve User", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("No such user id", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/updateSignedForm/{userId}",method = RequestMethod.POST)
    public ResponseEntity<?> updateSignedForm(@PathVariable int userId, @RequestBody String form){
        try {

            System.out.println("User: "+userId+":"+form);
            personalDocService.updateSignedForm(userId, form);

            return new ResponseEntity<>("Approve User", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("No such user id", HttpStatus.BAD_REQUEST);
        }
    }

    //return all employees
    @GetMapping("/hr/hire/user")
    public ResponseEntity<?> getEmployees(HttpServletRequest req){


            List<Employee> employees = new ArrayList();
            employees = employeeService.findAllEmployee();

            List<Person> people = new ArrayList();
            people = personService.findAll();

            if (employees.size() == 0) {
                System.out.println("there is no employee");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            if (people.size() == 0) {
                System.out.println("there is no person");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            EmplyoeeNPerson enp = new EmplyoeeNPerson(people, employees);

            return ResponseEntity.ok(enp);

    }
}

