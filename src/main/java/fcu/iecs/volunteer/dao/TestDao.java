package fcu.iecs.volunteer.dao;

import fcu.iecs.volunteer.model.TestEntity;
import org.springframework.data.repository.CrudRepository;

public interface TestDao extends CrudRepository<TestEntity, Integer> {
}
