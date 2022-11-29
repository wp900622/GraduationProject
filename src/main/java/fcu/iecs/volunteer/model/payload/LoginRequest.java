package fcu.iecs.volunteer.model.payload;


import lombok.Data;

@Data
public class LoginRequest {

  private String email;

  private String password;

}
