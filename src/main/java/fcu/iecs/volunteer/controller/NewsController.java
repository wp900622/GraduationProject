package fcu.iecs.volunteer.controller;

import fcu.iecs.volunteer.model.VolunteerMatchNews;
import fcu.iecs.volunteer.model.payload.MatchNews;
import fcu.iecs.volunteer.repository.VolunteerMakingNewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/matchnews")
public class NewsController {
    @Autowired
    VolunteerMakingNewsRepository volunteerMakingNewsRepository;
    @GetMapping("")
    public ResponseEntity GetSchool(){
        List<VolunteerMatchNews> news = volunteerMakingNewsRepository.findAll();
        return ResponseEntity.ok().body(news);
    }
    @PostMapping("/post")
    public ResponseEntity PostNews(@RequestBody MatchNews matchNews){
        VolunteerMatchNews volunteerMatch = new VolunteerMatchNews();
        volunteerMatch.setNews_time(new Date());
        volunteerMatch.setSchool(matchNews.getSchool());
        volunteerMatch.setContent(matchNews.getContent());
        volunteerMatch.setTitle(matchNews.getTitle());
        VolunteerMatchNews volunteerMatchid = volunteerMakingNewsRepository.save(volunteerMatch);
        return ResponseEntity.ok().body(volunteerMatchid);
    }

}
