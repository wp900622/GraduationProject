package fcu.iecs.volunteer.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table
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
    char sex;
    @Column
    String school;

}
