package com.example.server.DomainForNewAccount;

import java.io.File;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CarInfo {
    private String licensenum;
    private String expirationdate;
    private String driverlicensefile;
    private String carnum;
}
