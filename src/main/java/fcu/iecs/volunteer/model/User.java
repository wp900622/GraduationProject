package fcu.iecs.volunteer.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String email;
    @Column
    private String password;
    @Column
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="role_id", referencedColumnName = "id")
    private Role role;

}
