package com.example.server.controller;

import com.example.server.constant.JwtConstant;
import com.example.server.domain.Address;
import com.example.server.domain.Contact;
import com.example.server.domain.Employee;
import com.example.server.domain.Person;
import com.example.server.security.CookieUtil;
import com.example.server.security.JwtUtil;
import com.example.server.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class EmployeeEditController {
    @Autowired
    ContactService contactService;
    @Autowired
    PersonService personService;
    @Autowired
    AddressService addressService;
    @Autowired
    EmployeeService employeeService;
    @Autowired
    AWSS3Service awss3Service;

    @PutMapping("/employee/editContact")
    @ResponseBody
    public Contact editContact(@RequestBody Contact contact) {
        System.out.println("working...");
        this.contactService.updateContact(contact);
        return contact;
    }

    @PutMapping("/employee/editAddress")
    @ResponseBody
    public Address editAddress(@RequestBody Address address) {
        System.out.println("working...");
        this.addressService.save(address);
        return address;
    }

    @PutMapping("/employee/editPerson")
    @ResponseBody
    public Person editPerson(@RequestBody Person person) {
        System.out.println("working...");
        this.personService.save(person);
        return person;
    }

    @PutMapping("/employee/editEmployee")
    @ResponseBody
    public Employee editEmployee(@RequestBody Employee employee) {
        System.out.println("working...");
        this.employeeService.save(employee);
        return employee;
    }

    @PostMapping("/employee/editAvatar/{newAvatar}")
    @ResponseBody
    public String editEmployeeAvatar(HttpServletRequest request, @PathVariable String newAvatar) {
        System.out.println("working...");
        String token = CookieUtil.getValue(request, JwtConstant.JWT_COOKIE_NAME);
        Integer userId = JwtUtil.getUserIdFromJwt(token);
        Person person = personService.findByUserId(userId);
        Employee e = employeeService.findById(person.getId());
        e.setAvartar(newAvatar);
        this.employeeService.save(e);
        System.out.println(e.toString());
        return newAvatar;
    }
}
