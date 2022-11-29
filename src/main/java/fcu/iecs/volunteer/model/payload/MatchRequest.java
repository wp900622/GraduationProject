package fcu.iecs.volunteer.model.payload;

import lombok.Data;
import lombok.Getter;

import javax.persistence.Column;

@Data
@Getter
public class MatchRequest {
    private String username;


    private String telno;


    private String eduattain;


    private String subject;


    private String email;


    private Integer age;


    private String sex;


    private String city;


    private String area;


    private String address;

    private String school;

    private String work;
}
