package com.example.pain_scaleDB.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.pain_scaleDB.model.PainAssessment;
import com.example.pain_scaleDB.model.Patient;
import com.example.pain_scaleDB.repository.PainAssessmentRepository;
import com.example.pain_scaleDB.repository.PatientRepository;

@Service
public class PainAssessmentImpl implements PainAssessmentService{
    private final PainAssessmentRepository painAssessmentRepository;
    private final PatientRepository patientRepository;

    /*constructor */
    public PainAssessmentImpl(PainAssessmentRepository painAssessmentRepository, PatientRepository patientRepository){
        this.painAssessmentRepository = painAssessmentRepository;
        this.patientRepository = patientRepository;
    }

    @Override
    public List<PainAssessment> getPainAssessmentsForPatient(Long Id){
        return painAssessmentRepository.findPainAssessmentsByPatientId(Id);
    }

    @Override
    public void addAssessment(Long Id, PainAssessment painAssessment){
        Optional<Patient> patient = patientRepository.findById(Id);

        if (patient.isEmpty()){
            throw new RuntimeException("Patient not found");
        }

        painAssessment.setPatient(patient.get());
        painAssessmentRepository.save(painAssessment);
    }


}
