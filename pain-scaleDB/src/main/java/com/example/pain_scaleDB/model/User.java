package com.example.pain_scaleDB.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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

    /*fetch patients only when accessing the list */
    @ManyToMany(fetch = FetchType.LAZY)
    /*creates a many to many relation ship between user and patients (many users can have many patients, vice versa) */
    /* makes a new table with the user_id linked to patient_id*/
    @JoinTable(
        name = "user_patients",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "patient_id")
    )
    /*tells hibernate that this is the other table use to join */
    private List<Patient> patients = new ArrayList<>();

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
    public List<Patient> getPatients() {
        return patients;
    }
    public void setPatients(List<Patient> patients) {
        this.patients = patients;
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