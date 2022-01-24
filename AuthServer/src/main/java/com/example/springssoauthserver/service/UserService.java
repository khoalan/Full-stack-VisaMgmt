package com.example.springssoauthserver.service;


import com.example.springssoauthserver.domain.User;
import com.example.springssoauthserver.domain.UserRole;
import com.example.springssoauthserver.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import com.example.springssoauthserver.repository.UserRepository;
@Service
public class UserService
{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    public List<User> getAllUsers()
    {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }
    public void addUser(User user)
    {
        userRepository.save(user);
    }

    public User checkLogin(String username,String password){
        User user = userRepository.retrieveByUserName(username);
//        System.out.println("your role id: " + user.getUserRole().getRoleId());
        if(user == null)
            return null;
        if(user.getPassword().equals(password))
            return user;
        else
            return null;
    }

    public int getUserRoleId(String username){
        User user = userRepository.retrieveByUserName(username);
        UserRole role =  userRoleRepository.retrieveByUserId(user.getId());
        return role.getRoleId();
    }

    public int getUserActivateFlag(String username){
        User user = userRepository.retrieveByUserName(username);
        UserRole role =  userRoleRepository.retrieveByUserId(user.getId());
        return role.getActivateFlag();
    }

    public void register(String username, String password, String email){
        //register using input
        //to be implemented based on angular form input
        try{
            User tmp = new User();
            tmp.setUsername(username);
            tmp.setPassword(password);
            tmp.setEmail(email);
            tmp.setCreateDate(new Date().toString());
            tmp.setModificationDate(new Date().toString());
            userRepository.save(tmp);
            updateUserRole(username);
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public void updateUserRole(String username){
        User tmp = userRepository.retrieveByUserName(username);

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        UserRole tmpUserRole = new UserRole().builder()
                .roleId(1).userId(tmp.getId())
                .activateFlag(0)
                .createDate(now.toString())
                .lastModificationDate(now.toString()).build();

        userRoleRepository.save(tmpUserRole);
    }

    public void setUserFlagActive(int userId, int flag){
        UserRole userRole =  userRoleRepository.retrieveByUserId(userId);
        userRole.setActivateFlag(flag);
        userRoleRepository.save(userRole);
    }

    public User findUserById(int userId){
        return userRepository.findById(userId).get();
    }
}