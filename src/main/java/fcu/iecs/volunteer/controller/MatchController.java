package fcu.iecs.volunteer.controller;

import fcu.iecs.volunteer.model.Match;
import fcu.iecs.volunteer.model.payload.MatchRequest;
import fcu.iecs.volunteer.repository.MatchRepository;
import fcu.iecs.volunteer.repository.SchoolRepository;
import fcu.iecs.volunteer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/match")
public class MatchController {

    @Autowired
    SchoolRepository schoolRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MatchRepository matchRepository;
    @PostMapping("/post")
    public ResponseEntity CreateMatch(@RequestBody MatchRequest matchRequest){
        Match match = new Match();
        match.setEmail(matchRequest.getEmail());
        match.setAge(matchRequest.getAge());
        match.setSex(matchRequest.getSex());
        match.setEduattain(matchRequest.getEduattain());
        match.setTelno(matchRequest.getTelno());
        match.setCity(matchRequest.getCity());
        match.setArea(matchRequest.getArea());
        match.setAddress(matchRequest.getAddress());
        match.setSubject(matchRequest.getSubject());
        match.setSchool(matchRequest.getSchool());
        match.setUsername(matchRequest.getUsername());
        match.setWork(matchRequest.getWork());
        Match matchId = matchRepository.save(match);
        return  ResponseEntity.ok().body(match);
    }
    @GetMapping("/{school}")
    public ResponseEntity GetMatch(@PathVariable String school){
        List<Match> match = matchRepository.findBySchool(school);
        return ResponseEntity.ok().body(match);
    }
}