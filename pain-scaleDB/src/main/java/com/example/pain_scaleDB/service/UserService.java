package com.example.pain_scaleDB.service;
import com.example.pain_scaleDB.model.User;

/* This lists the operations that must exist just an interface */
public interface UserService {

    User findByUsername(String username);
    User saveUser(User user);
}
