package fcu.iecs.volunteer.model;

import fcu.iecs.volunteer.model.Student;
import fcu.iecs.volunteer.model.User;
import lombok.*;


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
  Integer academicyear;
  @Column
  Integer semester;
  @Column
  String subject;
  @Column
  Integer number;
  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "Student_id", referencedColumnName = "id")
  private Student student;


}
