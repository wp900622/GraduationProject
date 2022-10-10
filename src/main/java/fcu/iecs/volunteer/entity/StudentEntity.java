package fcu.iecs.volunteer.entity;

import fcu.iecs.volunteer.model.Role;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "stu_register")
@Getter
@Setter
@Data
@ToString
public class StudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer Id;

    @Column
    String Mail;

    @Column
    String pwd;

    @Column
    String username;

    @Column
    String stu_class;

    @Column
    String sex;
    @Column
    String school;
    @Column
    String telephone;
    @Column
    Integer grade;
    @Column
    String address_county;
    @Column
    String address_district;
    @Column
    String address;
    @Column
    Integer age;
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="role_id", referencedColumnName = "id")
    private Role role;
}
