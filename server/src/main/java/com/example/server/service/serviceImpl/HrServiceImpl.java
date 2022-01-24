package com.example.server.service.serviceImpl;

import com.example.server.domain.ApplicationWorkFlow;
import com.example.server.repository.ApplicationWorkFlowRepository;
import com.example.server.repository.VisaStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HrServiceImpl {
    @Autowired
    ApplicationWorkFlowRepository appRepo;

    @Autowired
    VisaStatusRepository visaRepo;

    public List<ApplicationWorkFlow> getAllAppWorkFlow(){
        return appRepo.findAll();
    }

    public ApplicationWorkFlow getAppWorkFlowByEmployeeId(int id){
        return appRepo.findByEmployeeId(id);
    }
}
