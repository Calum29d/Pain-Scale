package com.example.pain_scaleDB.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.pain_scaleDB.model.PainAssessment;


@Repository
public interface PainAssessmentRepository extends JpaRepository<PainAssessment, Long> {
    
    List<PainAssessment> findPainAssessmentsByPatientId(Long patientId);
}
