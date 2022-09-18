package fcu.iecs.volunteer.entity;

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




}
