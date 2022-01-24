package com.example.server.controller;

import java.util.*;

import javax.persistence.Table;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;

import com.example.server.DomainForNewAccount.*;
import com.example.server.domain.*;
import com.example.server.service.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import antlr.collections.List;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "http://localhost:4200",allowedHeaders = "*", allowCredentials = "true")
public class RegisterController {
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
    @Autowired
    private AWSS3Service service;


    @RequestMapping(value = "/register",method = RequestMethod.POST)
    public ResponseEntity<?> saveRegister(HttpServletResponse res, @RequestBody Map<String, Object> newacc){
        System.out.println("New Acc: " + newacc.toString());
        ObjectMapper mapper = new ObjectMapper();
        CarInfo carInfo =  mapper.convertValue(newacc.get("carInfo"), CarInfo.class);
        TAddress[] addressList = mapper.convertValue(newacc.get("addresslist"), TAddress[].class);
        WorkAuth workAuth = mapper.convertValue(newacc.get("workAuth"), WorkAuth.class);
        Reference reference = mapper.convertValue(newacc.get("reference"), Reference.class);
        Emergency emergency = mapper.convertValue(newacc.get("emergency"), Emergency.class);

        System.out.println("carInfo" + carInfo.toString());
        System.out.println("Address" + addressList.toString());
        System.out.println("Work auth "+workAuth.toString());
        System.out.println("reference "+reference.toString());
        System.out.println("emergency "+emergency.toString());

        // SAVE NEW PERSON
        //
        Person newPerson = new Person().builder()
                    .userId(Integer.parseInt(newacc.get("userId").toString()))
                    .firstName(newacc.get("firstname").toString())
                    .lastName(newacc.get("lastname").toString())
                    .middleName(newacc.get("middlename").toString())
                    .Email(newacc.get("email").toString())
                    .cellPhone(newacc.get("cellphone").toString())
                    .alternatePhone(newacc.get("cellphone").toString())
                    .Gender(newacc.get("gender").toString())
                    .SSN(Integer.parseInt(newacc.get("ssn").toString()))
                    .DOB(newacc.get("dob").toString())
                    .build();
        personService.save(newPerson);
        System.out.println("Saved person: "+newPerson.toString());
        int personId = personService.findByUserId(newPerson.getUserId()).getId();


        // SAVE NEW VISA
        //
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        VisaStatus newVisaStatus = new VisaStatus().builder()
                .visaType(workAuth.getVisa())
                .active(1)
                .createUserId(Integer.parseInt(newacc.get("userId").toString()))
                .modificationDate(now.toString())
                .build();

        VisaStatus savedVisa = visaStatusService.save(newVisaStatus);
        System.out.println("Saved visa: "+newVisaStatus.toString());

//        System.out.println();
//        Optional op = Optional.ofNullable(newacc.get("avatar").toString());

        // SAVE NEW EMPLOYEE
        //
        Employee newEmployee = new Employee().builder()
                    .personId(String.valueOf(personId))
                    .avartar(newacc.get("avatar").toString())
                    .car(carInfo.getCarnum())
                    .visaStatusId(workAuth.getVisa())
                    .visaStartDate(workAuth.getStartdate())
                    .visaEndDate(workAuth.getExpirationdate())
                    .driverLicense(carInfo.getLicensenum())
                    .driverLicenseExpDate(carInfo.getExpirationdate())
                    .visaStatusId(String.valueOf(savedVisa.getId()))
                    .visaStartDate(workAuth.getStartdate())
                    .visaEndDate(workAuth.getExpirationdate())
                    .build();

        Employee savedEmployee = employeeService.save(newEmployee);
        System.out.println("Saved emp: " + newEmployee.toString());

        // SAVE NEW CONTACT
        //
        Contact newContact = new Contact().builder()
                .relationship(emergency.getEm_relationship())
                .isEmergency("yes")
                .isReference("yes")
                .personId(personId)
                .isLandlord("no")
                .build();

        contactService.save(newContact);
        System.out.println("Saved contact: " + newContact.toString());

        // SAVE NEW ADDRESSES
        //
        for (TAddress address: addressList){
            Address newAddress = new Address().builder()
                    .addressLine1(address.getAddress1())
                    .addressLine2(address.getAddress2())
                    .city(address.getCity())
                    .personId(personId)
                    .stateAbbr(address.getState())
                    .stateName(address.getCity())
                    .zipCode(address.getZipcode())
                    .build();

            addressService.save(newAddress);
        }
        System.out.println("Saved addresses! ");

        //SAVE NEW APP WORK FLOW
        //
        ApplicationWorkFlow newApp = ApplicationWorkFlow.builder()
                .createdDate(now.toString())
                .employeeId(savedEmployee.getId())
                .modificationDate(now.toString())
                .comments("")
                .status("Pending")
                .type("Onboarding")
                .onboard("Pending")
                .build();

        ApplicationWorkFlow  savedApp = appWorkFlowService.save(newApp);
        System.out.println("Saved app: " + savedApp.toString());

        //SAVE NEW DOCS - DRIVER
        //
        PersonalDocument driver = new PersonalDocument().builder()
                .employeeId(savedEmployee.getId())
                .createUserId(Integer.parseInt(newacc.get("userId").toString()))
                .createDate(now.toString())
                .name("Driver")
                .path(carInfo.getDriverlicensefile())
                .comment("").build();

        PersonalDocument savedDrive = personalDocService.save(driver);
        System.out.println("Drive saved: " + savedDrive);

        //SAVE NEW DOCS - VISA
        //
        PersonalDocument visa = new PersonalDocument().builder()
                .employeeId(savedEmployee.getId())
                .createUserId(Integer.parseInt(newacc.get("userId").toString()))
                .createDate(now.toString())
                .name(workAuth.getVisa())
                .path(workAuth.getWorkAuthFile())
                .comment("").build();

        PersonalDocument savedVisaDoc = personalDocService.save(visa);
        System.out.println("Visadoc saved: " + savedVisaDoc);


        return null;
    }


    @PostMapping(value= "/upload")
    public ResponseEntity<String> uploadFile(@RequestParam(value= "file") final MultipartFile multipartFile) {
        final String response = service.uploadFile(multipartFile);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value= "/download")
    public ResponseEntity<ByteArrayResource> downloadFile(@RequestParam(value= "fileName") final String keyName) {
        final byte[] data = service.downloadFile(keyName);
        final ByteArrayResource resource = new ByteArrayResource(data);
        System.out.println(data);
        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + keyName + "\"")
                .body(resource);
    }

//    @RequestMapping(value = "/register",method = RequestMethod.POST)
//    public ResponseEntity<?> saveRegister(HttpServletResponse res, @RequestBody NewAccount newacc){
//        System.out.println(newacc.toString());
//        Gson g = new Gson();
////        Player p = g.fromJson(jsonString, Player.class);
//
//
//
//        try {
//            Person newPerson = new Person().builder()
//                    .userId(newacc.getUserId())
//                    .firstName(newacc.getFirstname())
//                    .lastName(newacc.getLastname())
//                    .middleName(newacc.getMiddlename())
//                    .Email(newacc.getEmail())
//                    .cellPhone(newacc.getCellphone())
//                    .alternatePhone(newacc.getWorkphone())
//                    .Gender(newacc.getGender())
//                    .SSN(Integer.parseInt(newacc.getSsn()))
//                    .DOB(newacc.getDob())
//                    .build();
//            //update new person
//            personService.save(newPerson);
//
//            //get personId from database;
//            int personId = personService.findByUserId(newPerson.getUserId()).getId();
//
//            Employee newEmployee = new Employee().builder()
//                    .personId(String.valueOf(personId))
//                    .avartar(newacc.getAvatar().toString())
//                    .car(newacc.getCarInfo().get("carnum").asText())
//                    .visaStatusId(newacc.getWorkAuth().get("visa").asText())
//                    .visaStartDate(newacc.getWorkAuth().get("startdate").asText())
//                    .visaEndDate(newacc.getWorkAuth().get("expirationdate").asText())
//                    .driverLicense(newacc.getCarInfo().get("driverlicensefile").asText())
//                    .driverLicenseExpDate(newacc.getCarInfo().get("expriationdate").asText())
//                    .build();
//
//            System.out.println("new emp: " + newEmployee.toString());
//            employeeService.save(newEmployee);
//
//            String containEmergency;
//            if(newacc.getEmergency()!=null){
//                containEmergency = "yes";
//            }else{ containEmergency = "no";}
//
//            Contact newContact = new Contact().builder()
//                    .personId(personId)
//                    .Relationship(newacc.getEmergency().get("em_relationship").asText())
//                    .isEmergency(containEmergency)
//                    .build();
//            System.out.println("new contc: " + newContact.toString());
//            contactService.save(newContact);
//
//            ArrayList<Address> addresses = new ArrayList();
//
//            System.out.println(newacc.getAddresslist().toString());
//            for(int i = 0 ; i < newacc.getAddresslist().length; i++){
//
//                System.out.println(newacc.getAddresslist()[i].toString());
//
//                addresses.add(new Address().builder()
//                        .addressLine1(newacc.getAddresslist()[i].get("address1").asText())
//                        .addressLine2(newacc.getAddresslist()[i].get("address2").asText())
//                        .city(newacc.getAddresslist()[i].get("city").asText())
//                        .zipCode(newacc.getAddresslist()[i].get("zipcode").asText())
//                        .stateName(newacc.getAddresslist()[i].get("state").asText())
//                        .personId(personId)
//                        .build()
//                );
//            }
//
//            System.out.println(addresses.toString());
//
//            for(Address add: addresses){
//                addressService.save(add);
//            }
//
//            return null;
//        } catch (Exception e) {
//            return null;
//        }
//    }

    @GetMapping("/testing")
    public String test(){
        return "test";
    }
}
