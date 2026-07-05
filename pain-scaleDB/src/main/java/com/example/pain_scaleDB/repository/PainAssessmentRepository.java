package com.example.pain_scaleDB.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.pain_scaleDB.model.PainAssessment;
import com.example.pain_scaleDB.model.Patient;

@Repository
public interface PainAssessmentRepository extends JpaRepository<PainAssessment, Long> {
    
    Patient findPatientById(Long patientId);
}
