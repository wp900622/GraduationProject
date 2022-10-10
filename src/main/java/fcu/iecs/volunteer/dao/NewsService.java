package fcu.iecs.volunteer.dao;

import fcu.iecs.volunteer.entity.NewsEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class NewsService {
    @Autowired
    NewsDao newsDao;
    public Iterable<NewsEntity> findNews(){
        return newsDao.findAll();
    }
    public Integer CreateNewsService(NewsEntity news){
        if(news.getTitle().trim().length() == 0){
            return 1;
        }else if(news.getNews_time().trim().length() == 0){
            return 2;
        }else if(news.getContent().trim().length() == 0){
            return 3;
        }
        newsDao.save(news);
        return 0;
    }
    public String updateNewsService(Integer Id , NewsEntity news){
        Optional<NewsEntity> News = findByMail(Id);
        if(!News.isPresent()){
            return "Not Found";
        }
        NewsEntity InstantNews = News.get();
        if(news.getContent().trim().length() == 0){
            return "內容不得為空";
        }
        if(news.getTitle().trim().length() == 0){
            return "標題不得為空";
        }
        if(news.getNews_time().trim().length() == 0){
            return "時間不得為空白";
        }
        InstantNews.setNews_time(news.getNews_time());
        InstantNews.setContent(news.getContent());
        InstantNews.setTitle(news.getTitle());
        newsDao.save(InstantNews);
        return "ok";
    }
    public Optional<NewsEntity> findByMail(Integer id){
        Optional<NewsEntity> news = newsDao.findById(id);
        return news;
    }

}
