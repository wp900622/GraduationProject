package fcu.iecs.volunteer.controller;

import fcu.iecs.volunteer.entity.StudentEntity;
import fcu.iecs.volunteer.utils.JwtToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin
@RestController
public class AuthController {

  @GetMapping("/sign")
  public ResponseEntity getStudentservice(){
    return ResponseEntity.status(HttpStatus.OK).body("Hello World");
  }

  @PostMapping("/signin")
  public ResponseEntity signin(@RequestBody HashMap<String, String> user) {
    JwtToken jwtToken = new JwtToken();
    String token = jwtToken.generateToken(user); // 取得token

    return ResponseEntity.status(HttpStatus.OK).body(token);
  }
}
