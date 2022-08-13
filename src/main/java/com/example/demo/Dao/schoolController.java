package com.example.demo.Dao;



import com.example.demo.entity.school_register;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;



@RestController
public class schoolController {
    private static final Logger logger
            = LoggerFactory.getLogger(schoolController.class);
    @Autowired
    schoolService schoolservice;

    @GetMapping("/school")
    public Iterable<school_register> getschoolService(){
        Iterable<school_register> school = schoolservice.getregister();
        logger.warn("Warning!.");
        return school;
    }
    @GetMapping("/school/{Id}")
    public Optional<school_register>getSchoolServices(@PathVariable Integer Id){
        Optional<school_register> school = schoolservice.findByMail(Id);

        return school;
    }

    @PostMapping(value="/schoolpost",consumes = "application/json",produces = "application/json")
    public ResponseEntity createSchool(@RequestBody school_register School_register) {
      Integer ID = schoolservice.createSchoolService(School_register);

      if(ID == 1){
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email不可為空值或格式不正確");
      }
      if(ID == 2){
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("使用者不得為空值");
      }
      if(ID == 3){
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("密碼不得為空值");
      }
      if(ID == 4){
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("學校不得為空值");
      }

          return ResponseEntity.status(HttpStatus.CREATED).body(ID);



    }
    @PutMapping("/schoolupdate/{Id}")
    public ResponseEntity updateSchool(@PathVariable Integer Id , @RequestBody school_register school){
        Boolean rlt = schoolservice.updateSchoolService(Id,school);
        if(!rlt){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("password 欄位不能為空");
        }
        return ResponseEntity.status(HttpStatus.OK).body("ok");
    }

}
