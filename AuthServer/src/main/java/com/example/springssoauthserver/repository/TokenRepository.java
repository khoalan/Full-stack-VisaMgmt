package com.example.springssoauthserver.repository;

import com.example.springssoauthserver.domain.RegistrationToken;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface TokenRepository extends CrudRepository<RegistrationToken, Integer>{
    @Query("FROM RegistrationToken rt WHERE LOWER(rt.email) = LOWER(:email)")
    RegistrationToken retrieveByEmail(@Param("email") String email);
}