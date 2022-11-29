package fcu.iecs.volunteer.dao;

import fcu.iecs.volunteer.entity.SchoolEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface SchoolDao extends JpaRepository<SchoolEntity, Integer> {
    Optional<SchoolEntity> findById(int ID);


}
