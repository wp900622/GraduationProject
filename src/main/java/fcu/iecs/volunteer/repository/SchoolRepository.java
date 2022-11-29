package fcu.iecs.volunteer.repository;

import fcu.iecs.volunteer.model.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.User;

import java.util.List;
import java.util.Optional;

public interface SchoolRepository extends JpaRepository<School, Integer> {

  Optional<School> findById(Integer id);

  Optional<School> findByUserId(Long userId);

  Optional<School> findByUser(fcu.iecs.volunteer.model.User user);



  @Modifying
  @Query("update User u set u.email = ?1, u.name = ?2 , u.password = ?3  where u.id =?4")
  void setUserInfoById(String email, String name, String paswsword,Integer userId);

}
