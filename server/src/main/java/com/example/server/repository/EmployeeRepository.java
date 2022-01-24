package com.example.server.repository;
import java.util.List;
import com.example.server.domain.Employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    Employee findById(int id);

    @Query("SELECT e FROM Employee e WHERE e.personId= ?1")
    public Employee findByPersonId(String personId);

    Employee save(Employee employee);

    List<Employee> findAll();
}
