package fcu.iecs.volunteer.model;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name= "ChineeseQuestion")
@Getter
@Setter
public class ChineseQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    String statement;

    @Column
    Integer number;

    @Column
    String choiceA;

    @Column
    String choice_B;

    @Column
    String choice_C;

    @Column
    String choice_D;

    @Column
    String choice_E;
}
