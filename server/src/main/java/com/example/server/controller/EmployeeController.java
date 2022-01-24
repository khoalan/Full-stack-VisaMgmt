package com.example.server.controller;

import com.example.server.constant.JwtConstant;
import com.example.server.domain.*;
import com.example.server.security.CookieUtil;
import com.example.server.security.JwtUtil;
import com.example.server.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;


@RestController
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;
    @Autowired
    PersonService personService;
    @Autowired
    ContactService contactService;
    @Autowired
    AddressService addressService;
    @Autowired
    PersonalDocService personalDocService;

    @GetMapping("/employee")
    public Employee getEmployeeByPersonId(HttpServletRequest request) {
        String token = CookieUtil.getValue(request, JwtConstant.JWT_COOKIE_NAME);
        System.out.println("Token from empl: " + token);
        Integer userId = JwtUtil.getUserIdFromJwt(token);
        Person person = personService.findByUserId(userId);
        System.out.println("P=== " + person.toString());
        Employee employee = employeeService.findByPersonId(person.getId());
        System.out.println("E=== " + employee.toString());
        return employee;
    }

    @GetMapping("employee/person")
    public Person getPersonByUserId(HttpServletRequest request) {
        System.out.println(request + " request");
        String token = CookieUtil.getValue(request, JwtConstant.JWT_COOKIE_NAME);
        Integer userId = JwtUtil.getUserIdFromJwt(token);
        Person person = personService.findByUserId(userId);
        return person;
    }

    @GetMapping("/employee/contact")
    public Contact getContactById(HttpServletRequest request) {
        String token = CookieUtil.getValue(request, JwtConstant.JWT_COOKIE_NAME);
        Integer userId = JwtUtil.getUserIdFromJwt(token);
        Person person = personService.findByUserId(userId);
        Contact contact = contactService.findByPersonId(person.getId());
        return contact;
    }

    // will return a query non unique exception as there are multiple addresses
    @GetMapping("/employee/address")
    public Address getAddressByPersonId(HttpServletRequest request) {
        String token = CookieUtil.getValue(request, JwtConstant.JWT_COOKIE_NAME);
        Integer userId = JwtUtil.getUserIdFromJwt(token);
        Person person = personService.findByUserId(userId);
        Address address = addressService.findByPersonId(person.getId());
        return address;
    }

    @GetMapping("employee/contacts")
    public List<Contact> getContacts(HttpServletRequest request) {
        String token = CookieUtil.getValue(request, JwtConstant.JWT_COOKIE_NAME);
        Integer userId = JwtUtil.getUserIdFromJwt(token);
        Person person = personService.findByUserId(userId);
        List<Contact> contacts = contactService.findByPersonIdAndIsEmergency(person.getId());
        return contacts;
    }

    @GetMapping("/employee/addresses")
    public List<Address> getAllAddressByPersonId(HttpServletRequest request) {
        String token = CookieUtil.getValue(request, JwtConstant.JWT_COOKIE_NAME);
        Integer userId = JwtUtil.getUserIdFromJwt(token);
        Person person = personService.findByUserId(userId);
        // find all address by person id
        List<Address> address = addressService.findAllByPersonId(person.getId());
        return address;
    }

    @GetMapping("/employee/documents")
    public List<PersonalDocument> getAllPathByUserID(HttpServletRequest request) {
        String token = CookieUtil.getValue(request, JwtConstant.JWT_COOKIE_NAME);
        Integer userId = JwtUtil.getUserIdFromJwt(token);

        List<PersonalDocument> personalDocument = personalDocService.findAllByCreateUserId(userId);

//        ArrayList<String> names = new ArrayList<>();
//        for(int i = 0; i < personalDocument.size(); i++) {
//            names.add(personalDocument.get(i).getPath());
//            names.add(personalDocument.get(i).getName());
//        }
//        for(int i = 0; i < names.size(); i++) {
//            System.out.println(names.get(i));
//        }
        return personalDocument;
    }

}
