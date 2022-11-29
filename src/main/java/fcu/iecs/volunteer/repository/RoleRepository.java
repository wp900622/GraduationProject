package fcu.iecs.volunteer.repository;

import fcu.iecs.volunteer.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {

  Optional<Role> findByName(String name);


  Optional<Role> findById(Integer id);

  List<Role> findByIdAndName(Integer id , String name);
  Boolean existsByName(String name);

}
