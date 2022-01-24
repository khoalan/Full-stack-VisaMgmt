package com.example.server.service;

import com.example.server.domain.Employee;

import java.util.List;

public interface EmployeeService {
    public Employee findById(int id);
    public Employee findByPersonId(int personId);
    public Employee save(Employee employee);
    public List<Employee> findAllEmployee();
}
