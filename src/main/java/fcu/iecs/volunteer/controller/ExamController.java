package fcu.iecs.volunteer.controller;

import fcu.iecs.volunteer.model.TestEntity;
import fcu.iecs.volunteer.model.Student;
import fcu.iecs.volunteer.model.User;
import fcu.iecs.volunteer.model.payload.ExamRequest;
import fcu.iecs.volunteer.repository.ExamRepository;
import fcu.iecs.volunteer.repository.StudentRepository;
import fcu.iecs.volunteer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/exam")
public class ExamController {
    @Autowired
    ExamRepository examRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthController authController;

    @Autowired
    StudentRepository studentRepository;
    AuthController.UserRole userRole;
    @PostMapping("/post")
    public ResponseEntity ExamPost(@RequestBody ExamRequest examRequest){
        Date date = new Date();

        TestEntity test = new TestEntity();
        Student StudentID = FindStu(examRequest.getEmail(),examRequest.getSchoolName(),examRequest.getName());
        if(date.getMonth() >= 2 && date.getMonth() < 9 ){
            test.setSemester(2);
            test.setAcademicyear(date.getYear() - 1);
            test.setNumber(examRequest.getNumber());

        }else{
            test.setSemester(1);
            test.setAcademicyear(date.getYear());
            test.setNumber(examRequest.getNumber());
        }
        test.setScores(examRequest.getScores());
        test.setSubject(examRequest.getSubject());
        test.setStudent(StudentID);
        TestEntity TestId = examRepository.save(test);
        return ResponseEntity.ok().body(test);
    }
    @GetMapping("/{id}")
    public ResponseEntity GetExam(@PathVariable Long id){
        User user = userRepository.findById(id).get();
        Student student = studentRepository.findByUser(user).get();
        List<TestEntity> testEntities = examRepository.findByStudent(student);
        return ResponseEntity.ok().body(testEntities);
    }
    public Student FindStu(String email , String school , String classname){
       Optional<User> user = userRepository.findByEmail(email);
       Student student = studentRepository.findByUser(user.get()).get();
       return student;
    }
}