package fcu.iecs.volunteer.dao;

import fcu.iecs.volunteer.entity.SchoolEntity;
import fcu.iecs.volunteer.entity.TestEntity;
import org.springframework.data.repository.CrudRepository;

public interface TestDao extends CrudRepository<TestEntity,Integer> {
}
