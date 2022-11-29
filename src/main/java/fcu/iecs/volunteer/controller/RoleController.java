package fcu.iecs.volunteer.controller;

import fcu.iecs.volunteer.model.Role;
import fcu.iecs.volunteer.repository.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api")
public class RoleController {

  @Autowired
  RoleRepository roleRepository;

  @GetMapping("/public/roles")
  public ResponseEntity getRoles() {
    List<Role> roles = roleRepository.findAll();
    return ResponseEntity.ok().body(roles);
  }


}
