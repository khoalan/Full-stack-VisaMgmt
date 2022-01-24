package com.example.server.domain.hr;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class MyDoc {
    private String docName;
    private String docUrl;
}
