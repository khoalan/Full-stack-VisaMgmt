package com.example.springssoauthserver.domain;

import lombok.*;

/**
 * Helper POJO to parse RequestBody
 * The payload of post request from Angular should be the login credentials
 * {
 *     username: "username",
 *     password: "password",
 *     isHr: true/false
 * }
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Account {
    private String username;
    private String password;
    private String isHr;
}
