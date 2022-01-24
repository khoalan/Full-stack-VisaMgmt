package com.example.server.service.serviceImpl;

import com.example.server.domain.PersonalDocument;
import com.example.server.repository.PersonalDocRepository;
import com.example.server.service.PersonalDocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonalDocServiceImpl implements PersonalDocService {

    @Autowired
    PersonalDocRepository personalDocRepository;

    @Override
    public PersonalDocument save(PersonalDocument personalDocument) {
        this.personalDocRepository.save(personalDocument);
        return personalDocument;
    }

    @Override

    public List<PersonalDocument> findAllByCreateUserId(int id) {
        List<PersonalDocument> personalDocumentList = this.personalDocRepository.findAllByCreateUserId(id);
        return personalDocumentList;
    }

    public PersonalDocument getDocByNameAndId(int employeeId, String name){
        return personalDocRepository.findByEmployeeIdAndName(employeeId, name);
    }

    public void removeWrongDoc(int userId, String wrongDoc){
        System.out.println("Remove wrong doc" + userId + ":" + wrongDoc);
        PersonalDocument newDoc = personalDocRepository.findByNameAndCreateUserId(wrongDoc, userId);
        personalDocRepository.delete(newDoc);
    }

    @Override
    public void updateSignedForm(int userId, String form){
        System.out.println("Update path" + userId + ":" + form);
        PersonalDocument newDoc = personalDocRepository.findByNameAndCreateUserId("I-983", userId);
        newDoc.setPath(form);
        personalDocRepository.save(newDoc);
    }
}
