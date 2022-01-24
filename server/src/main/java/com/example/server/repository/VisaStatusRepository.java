package com.example.server.repository;

import com.example.server.domain.VisaStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VisaStatusRepository extends JpaRepository<VisaStatus, Integer> {
    VisaStatus findById(int id);

    @Query("SELECT v.visaType FROM VisaStatus v WHERE v.createUserId=?1")
    String findVisaTypeById(int id);

    VisaStatus findByCreateUserId(int id);
    //VisaStatus findByVisaId(int id);

    //@Query("SELECT visa_type FROM visa_status")
    VisaStatus findVisaStatusByCreateUserId(int id);
}
