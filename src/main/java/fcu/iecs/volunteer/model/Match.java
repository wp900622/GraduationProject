package fcu.iecs.volunteer.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "matchmaking")
@Getter
@Setter
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String username;

    @Column(name = "telno")
    private String telno;

    @Column(name = "eduattain")
    private String eduattain;

    @Column
    private String subject;

    @Column
    private String email;

    @Column
    private Integer age;

    @Column
    private String sex;

    @Column
    private String city;

    @Column
    private String area;

    @Column
    private String address;

    @Column
    private String school;

    @Column
    private String work;
}
