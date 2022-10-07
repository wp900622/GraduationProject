package fcu.iecs.volunteer.model.payload;

import lombok.Data;
import lombok.Getter;

import java.util.List;

@Getter
public class JwtResponse {

  private final String token;
  private final String type = "Bearer";
  private final Long id;
  private final String username;
  private final String email;
  private final String role;

  public JwtResponse(String token, Long id, String username, String email, String role) {
    this.token = token;
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
  }
}
