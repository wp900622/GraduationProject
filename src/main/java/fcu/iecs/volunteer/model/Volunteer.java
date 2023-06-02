package fcu.iecs.volunteer.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "volunteer")
public class Volunteer {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;

  private String gender;

  private int age;

  @Column(name="highest_education")
  private String highEdu;

  private String expertise;

  @Column(name="tel_no" , nullable = false)
  private String telNo;

  private String city;

  private String area;

  private String address;

  private String educational_attainment;

  private String style;
}
