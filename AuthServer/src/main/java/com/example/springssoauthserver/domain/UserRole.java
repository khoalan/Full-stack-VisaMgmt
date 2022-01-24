package com.example.springssoauthserver.domain;

import lombok.*;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "user_role")
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "role_id")
    private int roleId;

    @Column(name = "activate_flag")
    private int activateFlag;
    @Column(name = "create_date")
    private String createDate;
    @Column(name = "last_mod_date")
    private String lastModificationDate;
}
