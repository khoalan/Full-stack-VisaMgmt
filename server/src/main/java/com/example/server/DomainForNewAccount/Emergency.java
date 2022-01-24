package com.example.server.DomainForNewAccount;

import lombok.*;

import javax.persistence.Table;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Emergency {
    private String em_firstname;
    private String em_lastname;
    private String em_middlename;
    private String em_cellphone;
    private String em_email;
    private String em_zipcode;
    private String em_relationship;
}
