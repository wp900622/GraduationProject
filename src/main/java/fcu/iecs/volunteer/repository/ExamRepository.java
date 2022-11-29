package fcu.iecs.volunteer.repository;

import fcu.iecs.volunteer.model.Student;
import fcu.iecs.volunteer.model.TestEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExamRepository extends JpaRepository<TestEntity , Integer> {
    Optional<TestEntity> findByAcademicyear(int academicyear);
    List<TestEntity> findByStudent(Student student);

}
