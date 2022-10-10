package fcu.iecs.volunteer.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "student")
public class Student {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;

  private String gender;

  private int age;

  @Column(name="school_name")
  private String schoolName;

  @Column(name="year_name")
  private String yearName;

  private String city;

  private String area;

  private String address;

}
