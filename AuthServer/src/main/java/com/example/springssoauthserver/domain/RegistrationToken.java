package com.example.springssoauthserver.domain;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.*;
import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.PriorityQueue;
import java.util.Set;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "RegistrationToken")
public class RegistrationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "Token")
    private String token;
    @Column(name = "ValidDuration")
    private Integer validDuration;
    @Column(name = "Email")
    private String email;
    @Column(name = "CreatedBy")
    private String createdBy;
}
