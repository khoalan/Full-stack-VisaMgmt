package com.example.server.repository;

import com.example.server.domain.Person;
import com.example.server.domain.PersonalDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PersonalDocRepository extends JpaRepository<PersonalDocument, Integer> {
    PersonalDocument save(PersonalDocument personalDocument);

    List<PersonalDocument> findAllByCreateUserId(int id);
    @Query("SELECT p FROM PersonalDocument p WHERE p.employeeId=?1 AND p.name=?2")
    PersonalDocument findByEmployeeIdAndName(int employeeId, String name);

    PersonalDocument findByNameAndCreateUserId(String wrongDoc, int userId);

    
}
