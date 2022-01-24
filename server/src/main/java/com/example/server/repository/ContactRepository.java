package com.example.server.repository;

import com.example.server.domain.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
    Contact findByPersonId(int personId);

    Contact findById(int id);

    List<Contact> findByPersonIdAndIsEmergency(int id, String isEmergency);

    Contact save(Contact contact);
}

