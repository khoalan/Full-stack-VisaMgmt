package com.example.springssoauthserver.repository;

import com.example.springssoauthserver.domain.User;
import com.example.springssoauthserver.domain.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {
    @Query("FROM UserRole u WHERE u.userId=:id")
    UserRole retrieveByUserId(Integer id);

}
