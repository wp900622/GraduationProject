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
    public Iterable<StudentEntity> getStudentservice(){
        Iterable<StudentEntity> student = stu.getregister();
        return student;
    }

    @PostMapping("/studentpost")
    public ResponseEntity createStudent(@RequestBody StudentEntity Student){
        String str = stu.createStuservice(Student);
        if(!str.equals("ok")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(str);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(str);
    }
    @PutMapping("/studentupdate/{id}")
    public ResponseEntity updateStudent(@PathVariable Integer id , @RequestBody StudentEntity Student){
        String str = stu.updateSchoolService(id, Student);
        if(!str.equals("ok")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(str);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(str);
    }
}
