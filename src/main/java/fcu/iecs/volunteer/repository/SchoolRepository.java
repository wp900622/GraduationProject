package fcu.iecs.volunteer.repository;

import fcu.iecs.volunteer.model.School;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SchoolRepository extends JpaRepository<School, Integer> {

  Optional<School> findById(Integer id);

  Optional<School> findByUserId(Long userId);

}
