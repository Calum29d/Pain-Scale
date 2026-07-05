package com.example.pain_scaleDB.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.pain_scaleDB.model.Patient;
import com.example.pain_scaleDB.model.User;
import com.example.pain_scaleDB.repository.PatientRepository;
import com.example.pain_scaleDB.repository.UserRepository;

@Service
/*transactional makes sure every every database operation is successful or none will be otherwise we will have inserts without updates etc. */
@Transactional
public class PatientAccessServiceImpl implements PatientAccessService{
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;

    /*constructor */
    @Autowired
    public PatientAccessServiceImpl(UserRepository userRepository, PatientRepository patientRepository){
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
    }

    @Override
    public List<Patient> getPatientsForUser(String username){
        User user = userRepository.findByUsername(username);

        /*check if the user exists first */
        if (user == null){
            throw new RuntimeException("User not found");
        }

        return user.getPatients();
    }

    @Override
    public void addPatientToUser(String username, String medCode, String name){
        User user = userRepository.findByUsername(username);
        if (user == null){
            throw new RuntimeException("User not found");
        }

        /*find the patient by medCode, or create one if it doesn't exist yet */
        Patient patient = patientRepository.findByMedCode(medCode);
        if (patient == null){
            patient = new Patient();
            patient.setMedCode(medCode);
            patient.setName(name);
            patient = patientRepository.save(patient);
        }
        /*udate the user to include the new patient */
        user.getPatients().add(patient);
        userRepository.save(user);
    }

    @Override
    public void removePatientFromUser(String username, String medCode){
        User user = userRepository.findByUsername(username);
        if (user == null){
            throw new RuntimeException("User not found");
        }

        Patient patient = patientRepository.findByMedCode(medCode);
        if (patient == null){
            throw new RuntimeException("Patient not found");
        }

        /*update the user to remove the patient */
        user.getPatients().remove(patient);
        userRepository.save(user);
    }

}
