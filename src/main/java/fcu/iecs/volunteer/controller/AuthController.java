package fcu.iecs.volunteer.controller;

import fcu.iecs.volunteer.model.*;
import fcu.iecs.volunteer.model.payload.*;
import fcu.iecs.volunteer.repository.*;
import fcu.iecs.volunteer.security.jwt.JwtToken;
import fcu.iecs.volunteer.security.service.UserDetailsImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/auth")
public class AuthController {

  public enum UserRole{
    School, Student, Volunteer;
  }

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  JwtToken jwtToken;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  SchoolRepository schoolRepository;

  @Autowired
  StudentRepository studentRepository;

  @Autowired
  VolunteerRepository volunteerRepository;

  @Autowired
  PasswordEncoder encoder;


  @GetMapping("/hello")
  public ResponseEntity getStudentservice() {
    return ResponseEntity.status(HttpStatus.OK).body("Hello World");
  }



  @PostMapping("/signin")
  public ResponseEntity signin(@RequestBody LoginRequest loginRequest) {

    log.info("Sing-in Email: " + loginRequest.getEmail());
    Optional<User> user = userRepository.findByEmail( loginRequest.getEmail());

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtToken.generateToken(authentication);
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    List<SimpleGrantedAuthority> roles = (List<SimpleGrantedAuthority>) userDetails.getAuthorities();
    String role = "";

    if (roles.size() == 1) {
      role = roles.get(0).getAuthority();
    }

    return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), role));
  }

  @PostMapping("/signup/school")
  public ResponseEntity signupSchool(@RequestBody SchoolSignupRequest schoolSignupRequest) {

    if (userRepository.existsByEmail(schoolSignupRequest.getEmail())) {
      return ResponseEntity.badRequest()
          .body(new MessageResponse("Error: Email already exists."));
    }
    User userWithId = registerUser(schoolSignupRequest , UserRole.School);

    School school = new School();
    school.setTelNo(schoolSignupRequest.getTelNo());
    school.setContactName(schoolSignupRequest.getContactName());
    school.setCity(schoolSignupRequest.getCity());
    school.setArea(schoolSignupRequest.getArea());
    school.setAddress(schoolSignupRequest.getAddress());
    school.setUser(userWithId);

    School schoolWithId = schoolRepository.save(school);

    return ResponseEntity.ok().body(schoolWithId);
  }

  @PostMapping("/signup/student")
  public ResponseEntity signupStudent(@RequestBody StudentSignupRequest studentSignupRequest) {

    if (userRepository.existsByEmail(studentSignupRequest.getEmail())) {
      return ResponseEntity.badRequest()
          .body(new MessageResponse("Error: Email already exists."));
    }
    User userWithId = registerUser(studentSignupRequest , UserRole.Student);

    Student student = new Student(userWithId
            , studentSignupRequest.getSchoolName()
            ,studentSignupRequest.getYearName());
    student.setGender(studentSignupRequest.getGender());
    student.setAge(studentSignupRequest.getAge());
    student.setSchoolName(studentSignupRequest.getSchoolName());
    student.setYearName(studentSignupRequest.getYearName());
    student.setCity(studentSignupRequest.getCity());
    student.setArea(studentSignupRequest.getArea());
    student.setAddress(studentSignupRequest.getAddress());
    student.setUser(userWithId);

    Student studentWithId = studentRepository.save(student);
    return ResponseEntity.ok().body(studentWithId);
  }

  @PostMapping("/signup/volunteer")
  public ResponseEntity signupVolunteer(@RequestBody VolunteerSignupRequest volunteerSignupRequest) {

    if (userRepository.existsByEmail(volunteerSignupRequest.getEmail())) {
      return ResponseEntity.badRequest()
          .body(new MessageResponse("Error: Email already exists."));
    }
    User userWithId = registerUser(volunteerSignupRequest , UserRole.Volunteer);
    Volunteer volunteer = new Volunteer();
    volunteer.setGender(volunteerSignupRequest.getGender());
    volunteer.setAge(volunteerSignupRequest.getAge());
    volunteer.setHighEdu(volunteerSignupRequest.getHighEdu());
    volunteer.setExpertise(volunteerSignupRequest.getExpertise());
    volunteer.setTelNo(volunteerSignupRequest.getTelNo());
    volunteer.setCity(volunteerSignupRequest.getCity());
    volunteer.setArea(volunteerSignupRequest.getArea());
    volunteer.setAddress(volunteerSignupRequest.getAddress());
    volunteer.setEducational_attainment(volunteerSignupRequest.getEducational_attainment());
    volunteer.setUser(userWithId);

    Volunteer volunteerWithId = volunteerRepository.save(volunteer);

    return ResponseEntity.ok().body(volunteerWithId);
  }

  private User registerUser(SignupRequest signupRequest, UserRole role) {

    Role roleObj = roleRepository.findByName(role.toString()).get();

    User user = new User(
        signupRequest.getEmail(),
        encoder.encode(signupRequest.getPassword()),
        signupRequest.getName());
    user.setRole(roleObj);

    User newUser = userRepository.save(user);
    log.info("New user: " + newUser.toString());
    return newUser;
  }

}
