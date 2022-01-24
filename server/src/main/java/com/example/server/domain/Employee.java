package com.example.server.domain;

import lombok.*;
import org.springframework.context.annotation.Primary;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@ToString
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "person_id")
    private String personId;
    @Column(name = "title")
    private String title;
    @Column(name = "manager_id")
    private String managerId;
    @Column(name = "start_date")
    private String startDate;
    @Column(name = "end_date")
    private String endDate;
    @Column(name = "avartar")
    private String avartar;
    @Column(name = "car")
    private String car;
    @Column(name = "visa_status_id")
    private String visaStatusId;
    @Column(name = "visa_start_date")
    private String visaStartDate;
    @Column(name = "visa_end_date")
    private String visaEndDate;
    @Column(name = "driver_license")
    private String driverLicense;
    @Column(name = "driver_license_expiration_date")
    private String driverLicenseExpDate;
    @Column(name = "house_id")
    private int houseId;
}
