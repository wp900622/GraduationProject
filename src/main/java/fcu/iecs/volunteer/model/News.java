package fcu.iecs.volunteer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "news")
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column
    private String title;
    @Column(name = "news_time")
    private Date newsTime;
    @Column
    private String content;
    @Column
    private String target;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "Role_id" , referencedColumnName = "id")
    Role role;
    private String type;

}
