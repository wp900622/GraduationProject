package fcu.iecs.volunteer.model.payload;

import lombok.Data;

@Data
public class StudentSignupRequest extends SignupRequest{

  private String gender;

  private int age;

  private String schoolName;

  private String yearName;

  private String style;

}
