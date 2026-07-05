package com.example.pain_scaleDB.service;
import com.example.pain_scaleDB.model.Patient;

/*operations that must exist in the patient service implementation */
public interface PatientService {
    Patient findByMedCode(String medCode);
    Patient savePatient(Patient patient);
}
