package com.example.demo.Dao;



import com.example.demo.entity.school_register;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;

@Component
public class schoolService {
    @Autowired
    SchoolDao schooldao;
    public Iterable<school_register> getregister() {
        return schooldao.findAll();
    }

    public Integer createSchoolService(school_register school)  {
        school_register rlt;
        String pattern = "^([a-zA-Z0-9_\\-.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$";
        Pattern r = Pattern.compile(pattern);
        if(school.getMail().trim().length() == 0 || !school.getMail().matches(pattern)){
            return 1;

        }
        if(school.getUsername().trim().length() == 0){
            return 2;
        }
        if(school.getPwd().trim().length() == 0){
          return 3;
        }
        if(school.getSchool().trim().length() == 0){
            return 4;
        }
        if(school.getTelephone().trim().length() == 0){
            return 5;
        }
        if(school.getAddress().trim().length() == 0){
            return 6;
        }
        else{
            schooldao.save(school);
            return 0;
        }


    }

    public Boolean updateSchoolService(Integer Id, school_register school){
        Optional<school_register> isExit = findByMail(Id);
        if(! isExit.isPresent()){
            return false;
        }
        school_register newschool = isExit.get();
        if(school.getPwd() == null){
            return false;
        }
        if(school.getUsername() == null){
            return false;
        }
        newschool.setPwd(school.getPwd());
        newschool.setUsername(school.getUsername());
        newschool.setSchool(school.getSchool());

        schooldao.save(newschool);
        return  true;
    }

    public Optional<school_register> findByMail(Integer Id) {
        Optional<school_register> school = schooldao.findById(Id);
        return school;
    }
}
