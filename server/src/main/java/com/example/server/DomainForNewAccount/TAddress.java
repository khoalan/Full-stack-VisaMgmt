package com.example.server.DomainForNewAccount;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TAddress {
    private String address1;
    private String address2;
    private String city;
    private String state;
    private String zipcode;
}
