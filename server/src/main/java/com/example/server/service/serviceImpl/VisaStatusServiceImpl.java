package com.example.server.service.serviceImpl;

import com.example.server.domain.VisaStatus;
import com.example.server.repository.VisaStatusRepository;
import com.example.server.service.VisaStatusService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VisaStatusServiceImpl implements VisaStatusService{
    @Autowired
    VisaStatusRepository visaStatusRepository;

    @Override
    public VisaStatus getVisaByUserId(int id) {
        VisaStatus visaStatus = visaStatusRepository.findByCreateUserId(id);
        return visaStatus;
    }
    
    public String getVisaTypeById(int id){
        String visaType = visaStatusRepository.findVisaTypeById(id);
        return visaType;
    }

    @Override
    public VisaStatus findByVisaId(int id){
        return visaStatusRepository.findById(id);
    };

    @Override
    public VisaStatus save(VisaStatus visa){
        return visaStatusRepository.save(visa);
    }

    @Override
    public VisaStatus findVisaStatusByCreateUserId(int id) {
        return this.visaStatusRepository.findVisaStatusByCreateUserId(id);
    }
}
