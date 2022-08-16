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
public class SchoolEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer Id;
    @Column
    String pwd;
    @Column
    String username;
    @Column
    String school;
    @Column
    String telephone;
    @Column
    String address_county;
    @Column
    String address_district;
    @Column
    String address;
    @Column
    String mail;

}