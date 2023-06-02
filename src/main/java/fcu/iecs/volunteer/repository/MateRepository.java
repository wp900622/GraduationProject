package fcu.iecs.volunteer.repository;

import fcu.iecs.volunteer.model.Mate;
import fcu.iecs.volunteer.model.Student;
import fcu.iecs.volunteer.model.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MateRepository extends JpaRepository<Mate,Integer> {
    List<Mate> findByStudentAndVolunteer(Student student, Volunteer volunteer);

    List<Mate> findBySchoolname(String schoolname);
}
