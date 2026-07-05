package com.example.pain_scaleDB.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


/*This Class is basically the data shape, Hibernate reads this class and creates a users table in PostgreSQL with columns
Id,  username and password */
@Entity
@Table(name = "users")
public class User {

    //auto increments the user ID, like when a user is created it will go 1, 2, 3, 4 and so on
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*cant have duplicate usernames */
    @Column(unique = true, nullable = false)
    private String username;
    private String password;


    //getters and setters

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    
}