package com.example.pain_scaleDB.service;

import java.util.List;

import com.example.pain_scaleDB.model.Patient;

public interface PatientAccessService {

    List<Patient> getPatientsForUser(String username);
    void addPatientToUser(String username, String medCode, String name);
    void removePatientFromUser(String username, String medCode);

}
