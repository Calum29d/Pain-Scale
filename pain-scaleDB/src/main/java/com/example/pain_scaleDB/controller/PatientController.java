package com.example.pain_scaleDB.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pain_scaleDB.model.Patient;
import com.example.pain_scaleDB.service.PatientAccessService;

/*REST API layer */
@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientAccessService patientAccessService;

    public PatientController(PatientAccessService patientAccessService) {
        this.patientAccessService = patientAccessService;
    }
/*get mapping returns the current logged inusers patient list */
    @GetMapping
    public ResponseEntity<List<Patient>> getPatients(Authentication authentication) {
        List<Patient> patients = patientAccessService.getPatientsForUser(authentication.getName());
        return ResponseEntity.ok(patients);
    }

    /*post mapping uses the post request to add a patient @RequestBody makes spring auto parse the JSON body from the req into a patient object */
    @PostMapping
    public ResponseEntity<String> addPatient(Authentication authentication, @RequestBody Patient patient) {
        patientAccessService.addPatientToUser(authentication.getName(), patient.getMedCode(), patient.getName());
        return ResponseEntity.ok("Patient added");
    }

    /*deletes a user with the given medCode */
    @DeleteMapping("/{medCode}")
    public ResponseEntity<String> removePatient(Authentication authentication, @PathVariable String medCode) {
        patientAccessService.removePatientFromUser(authentication.getName(), medCode);
        return ResponseEntity.ok("Patient removed");
    }
}