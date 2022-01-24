package com.example.server.DomainForNewAccount;

import java.io.File;

import com.example.server.domain.Address;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class NewAccount {

    private int userId;

    private String username;
    private String password;

    private String firstname;
    private String lastname;
    private String middlename;
    private String ssn;
    private String dob;
    private String gender;
    private String avatar;

    private String cellphone;
    private String workphone;
    private JsonNode[] addresslist;
    private String email;

    private JsonNode carInfo;

    private JsonNode workAuth;

    private JsonNode reference;
    private JsonNode emergency;
}
