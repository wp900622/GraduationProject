package fcu.iecs.volunteer.repository;


import fcu.iecs.volunteer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByemail(String email);

    Boolean existsByemail(String email);
}
