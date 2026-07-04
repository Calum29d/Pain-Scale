package com.example.pain_scaleDB.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.pain_scaleDB.security.JwtFilter;

/*this class defines custom security rules otherwise spring would use default */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    /*this is the hashing algorithm for passwords, by defining this bean UserServiceImpl and spring security
    can automatically see this and use the algorithm*/
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
         /*since im using react native we can disable this as its a browser issue */
        http.csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                /*dont need to create sessions as JWT holds who the user is on every req */
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            /*register and login must be publically accessible without auth, I may have to change this 
            slightly as there are other pages I will allow access to without auth */
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests.requestMatchers("/api/register", "/api/login").permitAll()
                    .anyRequest().authenticated()
            )
            /*puts the JwtFilter into the security chain so it runs before springs default one */
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
