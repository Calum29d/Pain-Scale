package com.example.pain_scaleDB.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
/*make sure the filter runs only once per request */
public class JwtFilter extends OncePerRequestFilter {

    /*brings in JwtUtil so this filter can validate the tokens and extract the usernames */
    private final JwtUtil jwtUtil;

    /*Consturctor */
    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    /*HttpServletRequest represents the incoming req from react native, response is used for what you will send back
    filterChain represents the chain of filters the req needs to pass through */
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        /*read the auth header from react native */
        String authHeader = request.getHeader("Authorization");
        
        /*check if the header exists and has a token */
        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            /*Extract the token cuts off 'Bearer'*/
            String token = authHeader.substring(7);

            /* Validate and auths the token by checking it isnt expired or been tampered with.
            Reads the username and finally creates an auth object and puts it into springs securityContext */
            if (jwtUtil.isTokenValid(token)) {
                String username = jwtUtil.extractUsername(token);
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(username, null, List.of());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        /*send the request to the next step */
        filterChain.doFilter(request, response);
    }
}