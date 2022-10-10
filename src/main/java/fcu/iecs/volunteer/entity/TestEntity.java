package fcu.iecs.volunteer.entity;

import fcu.iecs.volunteer.model.Role;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


import javax.persistence.*;

@Entity
@Table(name = "test_info")
@Getter
@Setter
@Data
@ToString

public class TestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer Id;
    @Column
    Integer scores;
    @Column
    Integer academic_year;
    @Column
    Integer semester;
    @Column
    String sub_ject;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="stu_id", referencedColumnName = "id")
    private StudentEntity stu;



}
