package fcu.iecs.volunteer.dao;

import fcu.iecs.volunteer.entity.StudentEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.regex.Pattern;

@Component
public class StudentService {
    @Autowired
    StudentDao studao;
    public Iterable<StudentEntity> getregister(){
            return studao.findAll();
    }

    public String createStuservice(StudentEntity Stu){
          String pattern = "^([a-zA-Z0-9_\\-.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$";
          Pattern r = Pattern.compile(pattern);
           if(Stu.getMail().trim().length() == 0 || !Stu.getMail().matches(pattern)){
               return "Mail不得為空白或不符合格式";
           }
           else if(Stu.getPwd().trim().length() == 0  ){
               return "密碼不得為空白";
           }
           else  if( Stu.getUsername().trim().length() == 0){
               return "使用者不得為空白";
            }
           else if(Stu.getSchool().trim().length() == 0){
               return "學校不得為空白";
            }
           else if(Stu.getStu_class().trim().length() == 0){
               return "班級不得為空白";
           }
           else if(Stu.getSex().trim().length() == 0){
               return "性別不得為空白";
           }
           else if(Stu.getAge() == 0){
               return "年齡不得為空白";
           }
           else if(Stu.getTelephone().trim().length() == 0){
               return "手機不得為空白";

           }
           studao.save(Stu);
            return "ok";
    }
    public String updateSchoolService(Integer Id , StudentEntity student){
        Optional<StudentEntity> stu = findByMail(Id);
        if(!stu.isPresent()){
            return "Not Found";
        }
       StudentEntity Student = stu.get();
        if(student.getPwd().trim().length() == 0){
            return "Password 不能是空白";
        }
        if(student.getUsername().trim().length() == 0){
            return "username不得為零";
        }
        if(student.getSchool().trim().length() == 0){
            return "School 不能是空白";
        }
        if(student.getTelephone().trim().length() == 0){
            return "Telephone不得為空白";
        }
        if(student.getSex().trim().length() == 0){
            return "性別不得為空白";
        }
        Student.setMail(student.getMail());
        Student.setTelephone(student.getTelephone());
        Student.setPwd(student.getPwd());
        Student.setSchool(student.getSchool());
        Student.setAge(student.getAge());
        Student.setGrade(student.getGrade());
        studao.save(Student);
        return "ok";
    }
    public Optional<StudentEntity> findByMail(Integer id){
        Optional<StudentEntity>  newStudent = studao.findById(id);
        return newStudent;
    }

}
