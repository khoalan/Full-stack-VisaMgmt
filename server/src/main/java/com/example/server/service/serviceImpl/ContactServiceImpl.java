package com.example.server.service.serviceImpl;

import com.example.server.domain.Contact;
import com.example.server.repository.ContactRepository;
import com.example.server.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactServiceImpl implements ContactService {
    @Autowired
    ContactRepository contactRepository;
    public Contact findById(int id) {
        Contact contact = contactRepository.findById(id);
        return contact;
    }

    @Override
    public Contact findByPersonId(int personId) {
        Contact contact = contactRepository.findByPersonId(personId);
        return contact;
    }

    @Override
    public List<Contact> findByPersonIdAndIsEmergency(int id) {
        String is = "yes";
        List<Contact> contacts = contactRepository.findByPersonIdAndIsEmergency(id, is);
        return contacts;
    }

    @Override
    public Contact updateContact(Contact contact) {
        Contact contact_updated = contactRepository.save(contact);
        return contact_updated;
    }

    public void save(Contact contact){
        contactRepository.save(contact);
    }
}
