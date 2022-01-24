package com.example.springssoauthserver.repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.example.springssoauthserver.domain.User;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User, Integer>{
    @Query("FROM User u WHERE LOWER(u.username) = LOWER(:username)")
    User retrieveByUserName(@Param("username") String username);

}    