package fcu.iecs.volunteer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name= "mate")
public class Mate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "stuid", referencedColumnName = "id")
    private Student student;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "volunteerid", referencedColumnName = "id")
    private Volunteer volunteer;

    private String schoolname;
}
