package fcu.iecs.volunteer.security.jwt;

import fcu.iecs.volunteer.security.service.UserDetailsImpl;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.security.auth.message.AuthException;
import java.io.Serializable;
import java.time.Instant;
import java.util.Date;

@Component
@Slf4j
public class JwtToken implements Serializable {

  @Value("${jwtSecret}")
  private String jwtSecret;

  @Value("${jwtExpirationMs}")
  private int jwtExpirationMs;
  //產生token
  public String generateToken(Authentication authentication) {

    UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

    String token = Jwts.builder().setSubject(userPrincipal.getEmail())
        .setIssuedAt(new Date())
        .setExpiration(new Date(Instant.now().toEpochMilli() + jwtExpirationMs))
        .signWith(SignatureAlgorithm.HS512, jwtSecret)
        .compact();
    System.out.println(token);
    return token;
  }

  public String getEmailFromJwtToken(String token) {
    return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
  }

  public void validateToken(String token) throws AuthException {
    try {
      Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
    } catch (SignatureException e) {
      throw new AuthException("Invalid JWT signature.");
    } catch (MalformedJwtException e) {
      throw new AuthException("Invalid JWT token.");
    } catch (ExpiredJwtException e) {
      throw new AuthException("Expired JWT token");
    } catch (UnsupportedJwtException e) {
      throw new AuthException("Unsupported JWT token");
    } catch (IllegalArgumentException e) {
      throw new AuthException("JWT token compact of handler are invalid");
    }

  }

}
