package fcu.iecs.volunteer.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column
    private String name;
}
