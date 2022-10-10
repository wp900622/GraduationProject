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

    public String createSchoolService(SchoolEntity school)  {
        SchoolEntity rlt;
        String pattern = "^([a-zA-Z0-9_\\-.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$";
        Pattern r = Pattern.compile(pattern);
        if(school.getMail().trim().length() == 0 || !school.getMail().matches(pattern)){
            return "Mail不得為空白或不符合格式";

        }
        if(school.getSchool_account().trim().length() == 0){
            return "學校不得為空白";
        }
        if(school.getPwd().trim().length() == 0){
            return "密碼不得為空白";
        }
        if(school.getSchool().trim().length() == 0){
            return "學校不得為空白";
        }
        if(school.getTelephone().trim().length() == 0){
            return "手機不得為空白";
        }
        if(school.getAddress().trim().length() == 0){
            return "地址不得為空白";
        }
        else{
            schooldao.save(school);
            return "ok";
        }


    }

    public String updateSchoolService(Integer Id, SchoolEntity school){
        Optional<SchoolEntity> isExit = findByMail(Id);
        if(! isExit.isPresent()){
            return "Not Found";
        }
        SchoolEntity newschool = isExit.get();
        if(school.getMail().trim().length() == 0){
            return "Mail不得為空白";
        }
        if(school.getPwd().trim().length() == 0){
            return "密碼不得為空白";
        }
        if(school.getSchool_account().trim().length() == 0){
            return "學校帳號不得為空白";
        }
        if(school.getSchool().trim().length() == 0){
            return "學校不得空白";
        }
        newschool.setMail(school.getMail());
        newschool.setPwd(school.getPwd());
        newschool.setSchool_account(school.getSchool_account());
        schooldao.save(newschool);
        return  "ok";
    }

    public Optional<SchoolEntity> findByMail(Integer Id) {
        Optional<SchoolEntity> school = schooldao.findById(Id);
        return school;
    }
}
