package com.example.server.service.serviceImpl;

import com.example.server.domain.ApplicationWorkFlow;
import com.example.server.domain.Employee;
import com.example.server.domain.Person;
import com.example.server.repository.ApplicationWorkFlowRepository;
import com.example.server.service.AppWorkFlowService;
import com.example.server.service.EmployeeService;
import com.example.server.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppWorkFlowServiceImpl implements AppWorkFlowService {

    @Autowired
    ApplicationWorkFlowRepository appRepo;
    @Autowired
    PersonService personService;
    @Autowired
    EmployeeService employeeService;

    @Override
    public ApplicationWorkFlow save(ApplicationWorkFlow app){
        ApplicationWorkFlow newApp = appRepo.save(app);
        return newApp;
    }

    @Override
    public void updateStatusOnboard(int userId, String status){
        Person tempPerson = personService.findByUserId(userId);
        System.out.println("Per: "+tempPerson.toString());
        Employee tempEmployee = employeeService.findByPersonId(tempPerson.getId());
        ApplicationWorkFlow temApp = appRepo.findByEmployeeId(tempEmployee.getId());
        System.out.println("TempApp: "+temApp.toString());
        temApp.setOnboard(status);
        temApp.setType("OPT-receipt");
        appRepo.save(temApp);
    }

    @Override
    public void updateStatusVisa(int userId, String status){
        Person tempPerson = personService.findByUserId(userId);
        Employee tempEmployee = employeeService.findByPersonId(tempPerson.getId());
        
        ApplicationWorkFlow temApp = appRepo.findByEmployeeId(tempEmployee.getId());
        System.out.println("TempApp: "+temApp.toString());
        temApp.setStatus(status);
        appRepo.save(temApp);
    }

    @Override
    public void updateStep(int userId, String step){
        Person tempPerson = personService.findByUserId(userId);
        Employee tempEmployee = employeeService.findByPersonId(tempPerson.getId());

        ApplicationWorkFlow temApp = appRepo.findByEmployeeId(tempEmployee.getId());
        System.out.println("TempApp: "+temApp.toString());
        temApp.setType(step);
        appRepo.save(temApp);
    }

    @Override
    public void setComment(int userId, String comment){
        Person tempPerson = personService.findByUserId(userId);
        Employee tempEmployee = employeeService.findByPersonId(tempPerson.getId());
        ApplicationWorkFlow temApp = appRepo.findByEmployeeId(tempEmployee.getId());
        temApp.setComments(comment);
        appRepo.save(temApp);
    }

    @Override
    public void deleteComment(int userId){
        Person tempPerson = personService.findByUserId(userId);
        Employee tempEmployee = employeeService.findByPersonId(tempPerson.getId());
        ApplicationWorkFlow temApp = appRepo.findByEmployeeId(tempEmployee.getId());
        temApp.setComments("");
        appRepo.save(temApp);
    }


}
