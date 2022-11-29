package fcu.iecs.volunteer.dao;

import fcu.iecs.volunteer.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface StudentDao extends JpaRepository<StudentEntity, Integer> {
    Optional<StudentEntity> findById(int id);

}
