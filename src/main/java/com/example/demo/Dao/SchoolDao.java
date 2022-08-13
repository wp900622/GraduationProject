package com.example.demo.Dao;

import com.example.demo.entity.school_register;

import org.springframework.data.repository.CrudRepository;


public interface SchoolDao extends CrudRepository<school_register,Integer> {
}
