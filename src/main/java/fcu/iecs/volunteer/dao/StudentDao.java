package fcu.iecs.volunteer.dao;

import fcu.iecs.volunteer.entity.StudentEntity;
import org.springframework.data.repository.CrudRepository;

public interface StudentDao extends CrudRepository<StudentEntity, Integer> {
}
