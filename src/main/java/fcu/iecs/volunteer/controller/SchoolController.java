package fcu.iecs.volunteer.controller;


import fcu.iecs.volunteer.dao.SchoolService;
import fcu.iecs.volunteer.entity.SchoolEntity;
import fcu.iecs.volunteer.model.School;
import fcu.iecs.volunteer.repository.SchoolRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;


@CrossOrigin
@RestController
@RequestMapping("/api/school")
public class SchoolController {
  @Autowired
  SchoolService schoolservice;

  @Autowired
  SchoolRepository schoolRepository;

  @GetMapping("")
  public ResponseEntity getSchools() {
    List<School> schools =  schoolRepository.findAll();
    return ResponseEntity.ok().body(schools);
  }
  
  @GetMapping("/{Id}")
  public Optional<SchoolEntity> getSchoolServices(@PathVariable Integer Id) {
    Optional<SchoolEntity> school = schoolservice.findByMail(Id);

    return school;
  }

  @PostMapping(value = "/schoolpost", consumes = "application/json", produces = "application/json")
  public ResponseEntity createSchool(@RequestBody School school) {
    schoolRepository.save(school);
    return ResponseEntity.status(HttpStatus.CREATED).body("Ok");
  }

  @PutMapping("/schoolupdate/{Id}")
  public ResponseEntity updateSchool(@PathVariable Integer Id, @RequestBody School school) {
     schoolRepository.setUserInfoById(school.getUser().getEmail(), school.getContactName(),school.getUser().getPassword(),Id);
    return ResponseEntity.status(HttpStatus.OK).body("ok");
  }

}
