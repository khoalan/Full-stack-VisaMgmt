package com.example.server.service;

import com.example.server.domain.PersonalDocument;

import java.util.List;

public interface PersonalDocService {
    public PersonalDocument save(PersonalDocument personalDocument);

    List<PersonalDocument> findAllByCreateUserId(int id);

    PersonalDocument getDocByNameAndId(int employeeId, String name);

    public void removeWrongDoc(int userId, String wrongDoc);

    public void updateSignedForm(int userId, String form);
}
