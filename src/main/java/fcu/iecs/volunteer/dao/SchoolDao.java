package fcu.iecs.volunteer.dao;

import fcu.iecs.volunteer.entity.SchoolEntity;

import org.springframework.data.repository.CrudRepository;


public interface SchoolDao extends CrudRepository<SchoolEntity,Integer> {
}
