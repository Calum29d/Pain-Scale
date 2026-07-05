package com.example.pain_scaleDB.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.pain_scaleDB.model.Patient;


@Repository
public interface PatientRepository extends JpaRepository<Patient, Long>{
    Patient findByName(String name);
}
