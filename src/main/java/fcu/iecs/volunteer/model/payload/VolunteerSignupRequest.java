package fcu.iecs.volunteer.model.payload;

import lombok.Data;

@Data
public class VolunteerSignupRequest extends SignupRequest{

  private String gender;

  private int age;

  private String highEdu;

  private String expertise;

  private String telNo;

  private String educational_attainment;

  private String style;

}
