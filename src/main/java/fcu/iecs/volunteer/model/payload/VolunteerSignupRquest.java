package fcu.iecs.volunteer.model.payload;

import lombok.Data;

@Data
public class VolunteerSignupRquest extends SignupRequest{

  private String gender;

  private int age;

  private String highEdu;

  private String expertise;

  private String telNo;

}
