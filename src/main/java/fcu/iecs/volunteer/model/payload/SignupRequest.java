package fcu.iecs.volunteer.model.payload;

import lombok.Data;

@Data
public class SignupRequest {

  private String email;

  private String password;

  private String name;

  private String city;

  private String area;

  private String address;


}
