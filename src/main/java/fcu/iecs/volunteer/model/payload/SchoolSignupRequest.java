package fcu.iecs.volunteer.model.payload;

import lombok.Data;

@Data
public class SchoolSignupRequest extends SignupRequest {

  private String telNo;

  private String contactName;

}
