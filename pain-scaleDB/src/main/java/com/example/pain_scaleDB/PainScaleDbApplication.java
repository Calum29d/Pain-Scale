package com.example.pain_scaleDB;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PainScaleDbApplication {

	/* run from terminal with ./mvnw spring-boot:run because for some reason the env variables dont get seen if you run from main */

	public static void main(String[] args) {
		SpringApplication.run(PainScaleDbApplication.class, args);
	}

}
