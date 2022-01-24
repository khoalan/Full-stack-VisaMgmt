package com.example.server.service.serviceImpl;

import com.example.server.domain.Employee;
import com.example.server.repository.EmployeeRepository;
import com.example.server.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public Employee findById(int id) {
        Employee employee = employeeRepository.findById(id);
        return employee;
    }

    @Override
    public Employee findByPersonId(int personId) {
        Employee employee = employeeRepository.findByPersonId(String.valueOf(personId));
        return employee;
    }

    @Override
    public Employee save(Employee employee) {
        this.employeeRepository.save(employee);
        return employee;
    }

    @Override
    public List<Employee> findAllEmployee() {
        List<Employee> employees = employeeRepository.findAll();
        return employees;
    }
}
