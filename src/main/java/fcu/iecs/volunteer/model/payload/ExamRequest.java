package fcu.iecs.volunteer.model.payload;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class ExamRequest {
    private int scores;

    private String subject;

    private String name;

    private String YearName;

    private String SchoolName;

    private String Email;

    private Integer number;


}
