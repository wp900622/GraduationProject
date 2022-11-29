package fcu.iecs.volunteer.repository;

import fcu.iecs.volunteer.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Integer> {
    List<Match> findBySchool(String School);
}
