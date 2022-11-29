package fcu.iecs.volunteer.model.payload;

import lombok.Data;
import lombok.Getter;

import java.util.Date;

@Getter
@Data
public class NewsRequest {
    String content;
    String title;
    String target;

    String type;
}
