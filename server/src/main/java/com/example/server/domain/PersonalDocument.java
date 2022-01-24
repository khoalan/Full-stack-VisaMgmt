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
@Table(name = "personal_doc")
public class PersonalDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    @Column(name="employee_id")
    private int employeeId;
    @Column(name="name")
    private String name;
    @Column(name="comment")
    private String comment;
    @Column(name="path")
    private String path;
    @Column(name="create_date")
    private String createDate;
    @Column(name="create_user_id")
    private int createUserId;
}
