package com.example.server.domain;

import lombok.*;

import javax.persistence.*;


//TODO: person id is many to one, and contact, employee, address rely on person id
// so I will look into joincolumn and manytoone tomorrow

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "person")
@ToString
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "firstname")
    private String firstName;
    @Column(name = "lastname")
    private String lastName;
    @Column(name = "middlename")
    private String middleName;
    @Column(name = "email")
    private String Email;
    @Column(name = "cellphone")
    private String cellPhone;
    @Column(name = "alternate_phone")
    private String alternatePhone;
    @Column(name = "gender")
    private String Gender;
    @Column(name = "ssn")
    private int SSN;
    @Column(name = "dob")
    private String DOB;
    @Column(name = "user_id")
    private int userId;
}
