package com.example.pain_scaleDB.controller;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.pain_scaleDB.service.UserService;
import com.example.pain_scaleDB.security.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.pain_scaleDB.model.User;


/*marks this as a REST API and returns JSON auto, all endpoints in this class start with /api */
@RestController
@RequestMapping("/api")
public class AuthContoller {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthContoller(UserService userService, JwtUtil jwtUtil, PasswordEncoder passwordEncoder){
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    /*request body reads the json from react native and maps it to a User object */
    public ResponseEntity<String> register(@RequestBody User user) {
        userService.saveUser(user);
        return ResponseEntity.ok("User has been registered");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        /*check if user exists */
        User found = userService.findByUsername(user.getUsername());

        if(found != null && passwordEncoder.matches(user.getPassword(), found.getPassword())){
            String token = jwtUtil.generateToken(found.getUsername());
            return ResponseEntity.ok(token);
        }
        
        return ResponseEntity.status(401).body("Invalid credentials");
    }
    
}
