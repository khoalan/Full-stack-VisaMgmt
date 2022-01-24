package com.example.server.repository;

import com.example.server.domain.ApplicationWorkFlow;
import com.example.server.domain.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationWorkFlowRepository extends JpaRepository<ApplicationWorkFlow, Integer> {
    ApplicationWorkFlow save(ApplicationWorkFlow app);

    ApplicationWorkFlow findByEmployeeId(int id);
}
