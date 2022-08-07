package com.example.demo.Dao;

import com.example.demo.entity.stu_register;
import org.springframework.data.repository.CrudRepository;

public interface StuDao extends CrudRepository<stu_register , Integer> {
}
