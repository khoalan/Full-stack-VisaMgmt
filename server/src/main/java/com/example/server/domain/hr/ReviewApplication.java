package com.example.server.domain.hr;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ReviewApplication {
    private String firstname;
    private String lastname;
    private String workAuth;
    private String status;
    private String type;
    private int userId;
    private String startdate;
    private String visaExpirationdate;
    private String dayLeft;
}
