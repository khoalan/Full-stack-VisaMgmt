package com.example.server.service;

import com.example.server.domain.ApplicationWorkFlow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

public interface AppWorkFlowService{
    public ApplicationWorkFlow save(ApplicationWorkFlow app);

    public void updateStatusOnboard(int id, String status);

    public void updateStatusVisa(int id, String status);
    
    public void updateStep(int id, String step);

    public void setComment(int id, String comment);

    public void deleteComment(int userId);
}
