package fcu.iecs.volunteer.repository;

import fcu.iecs.volunteer.model.News;
import fcu.iecs.volunteer.model.Role;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface NewsRepository extends PagingAndSortingRepository<News, Integer> {
    public Optional<News> findByContent(String content);
    public Optional<News> findByNewsTime(String newsTime);
    public Iterable<News> findByTitleContaining(String title);




    public List<News> findByRole(Role role);
}