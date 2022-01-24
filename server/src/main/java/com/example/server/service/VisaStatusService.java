package com.example.server.service;

import com.example.server.domain.VisaStatus;

public interface VisaStatusService {
    public VisaStatus findByVisaId(int id);
    
    public VisaStatus save(VisaStatus visaStatus);


    public String getVisaTypeById(int id);

    public VisaStatus getVisaByUserId(int id);

    public VisaStatus findVisaStatusByCreateUserId(int id);

}
