package com.example.server.service.serviceImpl;

import com.example.server.domain.Person;
import com.example.server.repository.PersonRepository;
import com.example.server.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonServiceImpl implements PersonService {
    @Autowired
    PersonRepository personRepository;
    @Override
    public Person findByUserId(int id) {
        Person person = personRepository.findByUserId(id);
        return person;
    }

    public Person findById(int id) {
        Person person = personRepository.findById(id);
        return person;
    }

    @Override
    public void createNewPerson(Person person) {
        personRepository.save(person);
    }
    
    @Override
    public Person save(Person person) {
        this.personRepository.save(person);
        return person;

    }

    @Override
    public List<Person> findAll() {
        List<Person> people = personRepository.findAll();
        return people;
    }
}
