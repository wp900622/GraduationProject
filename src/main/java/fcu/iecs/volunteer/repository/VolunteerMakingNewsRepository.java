package fcu.iecs.volunteer.repository;

import fcu.iecs.volunteer.model.VolunteerMatchNews;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VolunteerMakingNewsRepository extends JpaRepository<VolunteerMatchNews , Integer> {
    List<VolunteerMatchNews> findBySchool(String school);
}


