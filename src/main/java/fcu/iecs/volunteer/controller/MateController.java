package fcu.iecs.volunteer.controller;

import fcu.iecs.volunteer.model.Mate;
import fcu.iecs.volunteer.model.Student;
import fcu.iecs.volunteer.model.User;
import fcu.iecs.volunteer.model.Volunteer;
import fcu.iecs.volunteer.model.payload.MateRequest;
import fcu.iecs.volunteer.repository.MateRepository;
import fcu.iecs.volunteer.repository.StudentRepository;
import fcu.iecs.volunteer.repository.UserRepository;
import fcu.iecs.volunteer.repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/mate")
public class MateController {
    @Autowired
    VolunteerRepository volunteerRepository;
    @Autowired
    StudentRepository studentRepository;

    @Autowired
    MateRepository mateRepository;

    @Autowired
    UserRepository userRepository;
    @GetMapping("/get/{SchoolName}")
    public ResponseEntity getMate(@PathVariable String SchoolName){

        List<Mate> mate = mateRepository.findBySchoolname(SchoolName);
        return ResponseEntity.ok().body(mate);
    }

    @PostMapping("/post")
    public ResponseEntity PostMate(@RequestBody MateRequest mateRequest){
        Optional<User> user = userRepository.findByEmail(mateRequest.getStuemail());
        Optional<Volunteer> volunteer = volunteerRepository.findById(user.get().getId());
        Optional<User> stuuser = userRepository.findByEmail(mateRequest.getStuemail());
        Optional<Student> stu = studentRepository.findById(stuuser.get().getId());
        Mate mate = new Mate();
        mate.setSchoolname(mateRequest.getSchoolname());
        mate.setStudent(stu.get());
        mate.setVolunteer(volunteer.get());
        Mate mateWithId = mateRepository.save(mate);
        return ResponseEntity.ok().body(mateWithId);
    }
}
