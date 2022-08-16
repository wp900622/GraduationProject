package fcu.iecs.volunteer.dao;

import fcu.iecs.volunteer.entity.StudentEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
public class StudentService {
    @Autowired
    StudentDao studao;
    public Iterable<StudentEntity> getregister(){
            return studao.findAll();
    }

    public Integer createStuservice(StudentEntity Stu){
          String pattern = "^([a-zA-Z0-9_\\-.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$";
          Pattern r = Pattern.compile(pattern);
           if(Stu.getMail().length() == 0 || Stu.getPwd().length() == 0  ||
               Stu.getUsername().length() == 0 || !Stu.getMail().matches(pattern)
           ||Stu.getStu_class().length() == 0 || Stu.getSchool().length()== 0
           || Stu.getAge() == 0){
               return 1;
           }
            studao.save(Stu);
            return  0;
    }
}
