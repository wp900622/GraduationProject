package fcu.iecs.volunteer.repository;

import fcu.iecs.volunteer.model.Student;
import fcu.iecs.volunteer.model.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {

  Optional<Volunteer> findById(Long id);


}
