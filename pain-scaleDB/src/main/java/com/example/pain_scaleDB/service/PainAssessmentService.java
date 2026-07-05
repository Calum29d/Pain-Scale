package com.example.pain_scaleDB.service;

import java.util.List;

import com.example.pain_scaleDB.model.PainAssessment;
public interface PainAssessmentService {

    List<PainAssessment> getPainAssessmentsForPatient(Long Id);
    void addAssessment(Long Id, PainAssessment painAssessment);

}
