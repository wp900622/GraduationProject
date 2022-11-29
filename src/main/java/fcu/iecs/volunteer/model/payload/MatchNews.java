package fcu.iecs.volunteer.model.payload;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class MatchNews {
    private String title;

    private String content;

    private String school;
}
