package com.example.pain_scaleDB.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/*This class holds the datashape, Hibernate reads this class and creates a patients table in postgresql with columns */
@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String medCode;
    private String name;

    /*getters and setters */
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getMedCode() {
        return medCode;
    }
    public void setMedCode(String medCode) {
        this.medCode = medCode;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }


    


}
