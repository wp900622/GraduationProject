package fcu.iecs.volunteer.model;

import lombok.Data;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.*;

@Data
@Entity
@Table(name = "school")
public class School {


  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name="tel_no",nullable = false)
  private String telNo;

  @Column(name="contact_name",nullable = false)
  private String contactName;

  private String city;

  private String area;

  private String address;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;
}
