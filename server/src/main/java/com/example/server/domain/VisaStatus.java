package com.example.server.domain;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
@Builder
@Table(name = "visa_status")
public class VisaStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    @Column(name="visa_type")
    private String visaType;
    @Column(name="active")
    private int active;
    @Column(name="modification_date")
    private String modificationDate;
    @Column(name="create_user_id")
    private int createUserId;


}