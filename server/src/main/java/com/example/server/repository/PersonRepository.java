package com.example.server.repository;

import com.example.server.domain.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Integer> {
    Person findById(int id);
    Person findByUserId(int id);
    Person save(Person person);
    List<Person> findAll();
}
