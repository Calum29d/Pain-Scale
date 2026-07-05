package com.example.pain_scaleDB.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pain_scaleDB.model.PainAssessment;
import com.example.pain_scaleDB.service.PainAssessmentService;

/*REST API layer */
@RestController
@RequestMapping("/api/painAssessments")
public class PainAssessmentController {

    private final PainAssessmentService painAssessmentService;

    public PainAssessmentController(PainAssessmentService painAssessmentService){
        this.painAssessmentService = painAssessmentService;
    }

    /*get the list of pain assessments for the given patient */
    @GetMapping("/{patientId}")
    public ResponseEntity<List<PainAssessment>> getPainAssessments(@PathVariable Long patientId){
        List<PainAssessment> painAssessments = painAssessmentService.getPainAssessmentsForPatient(patientId);
        return ResponseEntity.ok(painAssessments);
    }


    /*add a pain assessment to the given patients history*/
    @PostMapping("/{patientId}")
    public ResponseEntity<String> addPainAssessment(@PathVariable Long patientId, @RequestBody PainAssessment painAssessment){
        painAssessmentService.addAssessment(patientId, painAssessment);
        return ResponseEntity.ok("Assessment added");
    }
    
    
}
