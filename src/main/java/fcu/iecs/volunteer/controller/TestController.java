package fcu.iecs.volunteer.controller;

import fcu.iecs.volunteer.dao.TestService;
import fcu.iecs.volunteer.entity.TestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class TestController {
    @Autowired
    TestService test;
    @GetMapping("/test")
    public Iterable<TestEntity> gettestService(){
        Iterable<TestEntity> TestService = test.getTest();
        return TestService;
    }

    @PostMapping("/testpost")
    public ResponseEntity createService(@RequestBody TestEntity testservice){
        Integer ID = test.createTestService(testservice);
        return ResponseEntity.status(HttpStatus.CREATED).body(ID);
    }
}
