package com.example.server.service;

import com.example.server.domain.Contact;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ContactService {
    public Contact findById(int id);
    public Contact findByPersonId(int personId);
    public List<Contact> findByPersonIdAndIsEmergency(int id);
    public Contact updateContact(Contact contact);
    public void save(Contact contact);
}
