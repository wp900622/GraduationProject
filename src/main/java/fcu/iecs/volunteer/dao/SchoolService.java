package fcu.iecs.volunteer.dao;



import fcu.iecs.volunteer.entity.SchoolEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.regex.Pattern;

@Component
public class SchoolService {
    @Autowired
    SchoolDao schooldao;
    public Iterable<SchoolEntity> getregister() {
        return schooldao.findAll();
    }

    public Integer createSchoolService(SchoolEntity school)  {
        SchoolEntity rlt;
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

    public Boolean updateSchoolService(Integer Id, SchoolEntity school){
        Optional<SchoolEntity> isExit = findByMail(Id);
        if(! isExit.isPresent()){
            return false;
        }
        SchoolEntity newschool = isExit.get();
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

    public Optional<SchoolEntity> findByMail(Integer Id) {
        Optional<SchoolEntity> school = schooldao.findById(Id);
        return school;
    }
}
