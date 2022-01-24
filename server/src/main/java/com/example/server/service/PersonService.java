package com.example.server.service;

import com.example.server.domain.Employee;
import com.example.server.domain.Person;

import java.util.List;

public interface PersonService {
    public Person findById(int id);
    public Person findByUserId(int id);
    public void createNewPerson(Person person);
    public Person save(Person person);
    public List<Person> findAll();
}
