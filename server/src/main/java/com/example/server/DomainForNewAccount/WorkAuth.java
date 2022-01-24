package com.example.server.DomainForNewAccount;

import java.io.File;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WorkAuth {
    private boolean permanent;
    private String permanentStatus;
    private String visa;
    private String startdate;
    private String expirationdate;
    private String workAuthFile;
}
    