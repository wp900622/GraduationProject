package fcu.iecs.volunteer.utils;

import io.jsonwebtoken.*;

import javax.naming.AuthenticationException;
import javax.security.auth.message.AuthException;
import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtToken implements Serializable {

  private static final long EXPIRATION_TIME = 1 * 60 * 1000;

  private static final String SECRET_KEY = "student volunteer";

  public String generateToken(Map<String, String> user) {
    Map<String, Object> claims = new HashMap<>();

    claims.put("userName", user.get("userName"));

    String token = Jwts.builder().setClaims(claims)
        .setExpiration(new Date(Instant.now().toEpochMilli() + EXPIRATION_TIME))
        .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
        .compact();
    System.out.println(token);
    return token;
  }

  public void validateToken(String token) throws AuthException {
    try {
      Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJwt(token);
    } catch (SignatureException e) {
      throw new AuthException("Invalid JWT signature.");
    }
    catch (MalformedJwtException e) {
      throw new AuthException("Invalid JWT token.");
    }
    catch (ExpiredJwtException e) {
      throw new AuthException("Expired JWT token");
    }
    catch (UnsupportedJwtException e) {
      throw new AuthException("Unsupported JWT token");
    }
    catch (IllegalArgumentException e) {
      throw new AuthException("JWT token compact of handler are invalid");
    }

  }

}
