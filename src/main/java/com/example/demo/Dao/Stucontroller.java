package com.example.demo.Dao;

import com.example.demo.entity.stu_register;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class Stucontroller {
    @Autowired
    stuService stu;
    @GetMapping("/student")
    public Iterable<stu_register> getStudentservice(){
        Iterable<stu_register> student = stu.getregister();
        return student;
    }

    @PostMapping("/studentpost")
    public ResponseEntity createStudent(@RequestBody stu_register Student){
        Integer ID = stu.createStuservice(Student);
        if(ID != 0){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ID);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(ID);
    }



}
