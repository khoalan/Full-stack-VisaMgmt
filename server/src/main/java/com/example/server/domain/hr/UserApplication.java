package com.example.server.domain.hr;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class UserApplication {
    private String firstname;
    private String lastname;
    private String middlename;
    private int ssn;
    private String dob;
    private String gender;
    private String avatar;

    private String cellphone;
    private String workphone;
    private String address1;
    private String address2;
    private String city;
    private String state;
    private String zipcode;
    private String email;

    private String licensenum;
    private String expirationdate;
    private String carnum;


    private String visa;
    private String startdate;
    private String visaExpirationdate;
    private String visaDoc;
    private String driverLicense;

    private String status;
    private String type;
    private List<MyDoc> visaTypeDoc;
    private String comment;
    private long dayLeft;
}
