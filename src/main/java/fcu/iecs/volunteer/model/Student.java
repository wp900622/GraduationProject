package fcu.iecs.volunteer.model;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@Table(name = "student")
public class Student {
  public Student(User user, String schoolName, String yearName) {
    this.user = user;
    this.schoolName = schoolName;
    this.yearName = yearName;
  }



  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;

  private String gender;

  private int age;

  @Column(name="school_name",nullable = false)
  private String schoolName;

  @Column(name="year_name" , nullable = false)
  private String yearName;



  private String city;

  private String area;

  private String address;



}
