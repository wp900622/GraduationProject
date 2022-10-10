package fcu.iecs.volunteer.entity;

import fcu.iecs.volunteer.dao.TestService;
import fcu.iecs.volunteer.model.Role;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.LastModifiedDate;
import org.w3c.dom.Text;

import javax.persistence.*;

@Entity
@Table(name = "news")
@Getter
@Setter
@Data
@ToString
public class NewsEntity  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer Id;
    @Column
    String title;
    @Column
    String news_time;
    @Column
    String content;
    @Column
    String image_information;

}
