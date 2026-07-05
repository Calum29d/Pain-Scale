package com.example.pain_scaleDB.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pain_scaleDB.model.Patient;
import com.example.pain_scaleDB.repository.PatientRepository;

/*Logic is implemented here before data is given to the database */
@Service
public class PatientServiceImpl implements PatientService {  
    private final PatientRepository patientRepository;

    /*consturctor */

    @Autowired
    public PatientServiceImpl(PatientRepository patientRepository){
        this.patientRepository = patientRepository;

    }

    @Override
    public Patient findByMedCode(String medCode){
        return patientRepository.findByMedCode(medCode);
    }

    @Override 
    public Patient savePatient(Patient patient){
        return patientRepository.save(patient);
    }

}
