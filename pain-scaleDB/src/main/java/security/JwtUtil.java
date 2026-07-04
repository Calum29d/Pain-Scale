package security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.MacAlgorithm;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private final MacAlgorithm ALGORITHM = Jwts.SIG.HS256;
    private final SecretKey key = ALGORITHM.key().build();
    private final long EXPIRATION_MS = 3600000; //1 hour until the token expires and user has to login again


    /*Builds the JWT and returns it as a string with the embedded data
    This gets called when the user Sucessfully logs in */
    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_MS)) //expire 1 hour from current time
                .signWith(key, ALGORITHM)
                .compact();
    }


    /*Parses the incoming token, verifies that the signature matches the secret key. Finally reads and returns the username embedded inside */
    public String extractUsername(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    /*Calls the extractUsername function and if the token return is true/valid ture is returned which is used in JwtFilter to decide whether to auth the request */
    public boolean isTokenValid(String token) {
        try {
            extractUsername(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}