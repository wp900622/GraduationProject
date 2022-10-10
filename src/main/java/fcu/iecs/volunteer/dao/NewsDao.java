package fcu.iecs.volunteer.dao;

import fcu.iecs.volunteer.entity.NewsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsDao extends CrudRepository<NewsEntity,Integer>{

}
