package fcu.iecs.volunteer.controller;

import fcu.iecs.volunteer.model.Role;
import fcu.iecs.volunteer.model.User;
import fcu.iecs.volunteer.model.payload.JwtResponse;
import fcu.iecs.volunteer.model.payload.LoginRequest;
import fcu.iecs.volunteer.model.payload.MessageResponse;
import fcu.iecs.volunteer.model.payload.SignupRequest;
import fcu.iecs.volunteer.repository.RoleRepository;
import fcu.iecs.volunteer.repository.UserRepository;
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

import java.util.Collection;
import java.util.HashMap;
import java.util.List;

@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  JwtToken jwtToken;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @GetMapping("/hello")
  public ResponseEntity getStudentservice() {
    return ResponseEntity.status(HttpStatus.OK).body("Hello World");
  }

  @PostMapping("/signin")
  public ResponseEntity signin(@RequestBody LoginRequest loginRequest) {

    log.info("Sing-in Email: " + loginRequest.getEmail());

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

  @PostMapping("/signup")
  public ResponseEntity signup(@RequestBody SignupRequest signUpRequest) {

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest()
          .body(new MessageResponse("Error: Email already exists."));
    }

    User user = new User(signUpRequest.getEmail(),
        encoder.encode(signUpRequest.getPassword()),
        signUpRequest.getName());

    int roleId = signUpRequest.getRoleId();

    Role role = roleRepository.findById(roleId).get();

    user.setRole(role);

    userRepository.save(user);
    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));

  }
}
