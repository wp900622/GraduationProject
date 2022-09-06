package fcu.iecs.volunteer.controller;



import fcu.iecs.volunteer.dao.SchoolService;
import fcu.iecs.volunteer.entity.SchoolEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@CrossOrigin
@RestController
public class SchoolController {
    private static final Logger logger
            = LoggerFactory.getLogger(SchoolController.class);
    @Autowired
    SchoolService schoolservice;

    @GetMapping("/school")
    public Iterable<SchoolEntity> getschoolService(){
        Iterable<SchoolEntity> school = schoolservice.getregister();

        return school;
    }
    @GetMapping("/school/{Id}")
    public Optional<SchoolEntity>getSchoolServices(@PathVariable Integer Id){
        Optional<SchoolEntity> school = schoolservice.findByMail(Id);

        return school;
    }

    @PostMapping(value="/schoolpost",consumes = "application/json",produces = "application/json")
    public ResponseEntity createSchool(@RequestBody SchoolEntity schoolEntity) {
      Integer ID = schoolservice.createSchoolService(schoolEntity);

      if(ID != 0){
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("欄位不得為空值或帳號格式不正確");
      }


          return ResponseEntity.status(HttpStatus.CREATED).body(ID);



    }
    @PutMapping("/schoolupdate/{Id}")
    public ResponseEntity updateSchool(@PathVariable Integer Id , @RequestBody SchoolEntity school){
        Boolean rlt = schoolservice.updateSchoolService(Id,school);
        if(!rlt){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("password 欄位不能為空");
        }
        return ResponseEntity.status(HttpStatus.OK).body("ok");
    }

}
