package com.example.springssoauthserver.service;

import com.example.springssoauthserver.constant.JwtConstant;
import com.example.springssoauthserver.domain.RegistrationToken;
import com.example.springssoauthserver.domain.User;
import com.example.springssoauthserver.repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.*;
import javax.transaction.Transactional;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Service
public class TokenService {
    @Autowired
    private TokenRepository tokenRepository;
    private static DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
    @Transactional
    public void insertRegistrationToken(String jwt, String email){
        RegistrationToken registrationToken = new RegistrationToken();
        registrationToken.setToken(jwt);
        registrationToken.setEmail(email);
        registrationToken.setCreatedBy(LocalDateTime.now().format(formatter));
        registrationToken.setValidDuration(JwtConstant.REGISTRATION_VALID_DURATION);
        tokenRepository.save(registrationToken);
    }

    @Transactional
    public void removeExpiredToken(){
        List<RegistrationToken> list = new ArrayList<>();
        tokenRepository.findAll().forEach(list::add);
        //retrieve the current date time
        LocalDateTime now = LocalDateTime.now();
        Iterator<RegistrationToken> itr = list.iterator();
        while(itr.hasNext()){
            Duration duration = Duration.between(now, LocalDateTime.parse(itr.next().getCreatedBy(),formatter));
            if(duration.toMinutes() > itr.next().getValidDuration()){
                tokenRepository.delete(itr.next());
            }
        }
    }

    @Transactional
    public void removeRegisteredToken(String email){
        RegistrationToken registrationToken = tokenRepository.retrieveByEmail(email);
        if(registrationToken != null){
            tokenRepository.delete(registrationToken);
        }
    }
}
