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
@Table(name = "contact")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "person_id")
    private int personId;
    @Column(name = "relationship")
    private String relationship;
    @Column(name = "title")
    private String title;
    @Column(name = "is_reference")
    private String isReference;
    @Column(name = "is_emergency")
    private String isEmergency;
    @Column(name = "is_landlord")
    private String isLandlord;
}
