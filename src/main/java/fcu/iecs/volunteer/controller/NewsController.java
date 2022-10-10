package fcu.iecs.volunteer.controller;

import fcu.iecs.volunteer.dao.NewsService;
import fcu.iecs.volunteer.entity.NewsEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
public class NewsController {
    @Autowired
    NewsService newsService;

    @GetMapping("/news")
    public Iterable<NewsEntity> getnewsService(){
        return newsService.findNews();
    }
    @PostMapping("/newspost")
    public ResponseEntity createNews(@RequestBody NewsEntity news){
        Integer id = newsService.CreateNewsService(news);
        if(id != 0){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("不得為空值");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
    @PutMapping("/newsupdate/{id}")
    public ResponseEntity NewsUpdate(@PathVariable Integer id ,@RequestBody NewsEntity news){
        String str = newsService.updateNewsService(id, news);
        if(!str.equals("ok")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(str);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(str);
    }
}
