package fcu.iecs.volunteer.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name =  "news2")
public class VolunteerMatchNews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String title;

    @Column
    private Date news_time;

    @Column
    private String content;

    @Column
    private String school;

}
