package fcu.iecs.volunteer.controller;

import fcu.iecs.volunteer.model.News;
import fcu.iecs.volunteer.model.Role;
import fcu.iecs.volunteer.model.School;
import fcu.iecs.volunteer.model.payload.NewsRequest;
import fcu.iecs.volunteer.repository.NewsRepository;
import fcu.iecs.volunteer.repository.RoleRepository;
import fcu.iecs.volunteer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/news")
public class NewsManagementController {
    @Autowired
    NewsRepository newsRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/post")
    public ResponseEntity NewsPost(@RequestBody NewsRequest newsRequest){
        News news = new News();
        news.setNewsTime(new Date());
        news.setContent(newsRequest.getContent());
        news.setTitle(newsRequest.getTitle());
        news.setTarget(newsRequest.getTarget());
        news.setType(newsRequest.getType());
        Role role = roleRepository.findByName(newsRequest.getTarget()).get();
        news.setRole(role);
        News newsId = newsRepository.save(news);
        return ResponseEntity.ok().body(newsId);
    }

    @GetMapping("/{name}")
    public ResponseEntity ShowNews(@PathVariable String name){
        Role role = roleRepository.findByName(name).get();

        Iterable<News> news = newsRepository.findByRole(role);
        return ResponseEntity.ok().body(news);
    }
    @GetMapping("/find/{page}")
    public Iterable<News> listNewsByPage(@PathVariable("page") int page){
        int elementInOnepage = 7;
        Pageable pageable = PageRequest.of(page, elementInOnepage );
        return newsRepository.findAll(pageable).getContent();
    }
    @GetMapping(path = "/search")
    public Iterable<News> listProductByPage(@RequestParam String title ) {

        return newsRepository.findByTitleContaining(title);
    }

}