package fcu.iecs.volunteer.repository;

import fcu.iecs.volunteer.model.Student;
import fcu.iecs.volunteer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;



public interface StudentRepository extends JpaRepository<Student, Long> {

  Optional<Student> findById(Long id);
  Optional<Student> findByUser(User user );
}


