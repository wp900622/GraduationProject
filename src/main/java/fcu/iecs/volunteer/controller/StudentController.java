package fcu.iecs.volunteer.controller;

import fcu.iecs.volunteer.dao.StudentService;
import fcu.iecs.volunteer.entity.StudentEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class StudentController {
  @Autowired
  StudentService stu;

  @GetMapping("/student")
  public Iterable<StudentEntity> getStudentservice() {
    Iterable<StudentEntity> student = stu.getregister();
    return student;
  }

  @PostMapping("/studentpost")
  public ResponseEntity createStudent(@RequestBody StudentEntity Student) {
    Integer ID = stu.createStuservice(Student);
    if (ID != 0) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(" 0123");
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(ID);
  }
  @GetMapping("/API")
  public ResponseEntity SellerGet(){
    //SellerAndShoes seller = sellerRepository.findByNumber(number).get();
    return ResponseEntity.status(HttpStatus.OK).body("123");

  }



}
