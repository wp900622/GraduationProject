package fcu.iecs.volunteer.dao;

import fcu.iecs.volunteer.entity.StudentEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
public class StudentService {
  @Autowired
  StudentDao studao;

  public Iterable<StudentEntity> getregister() {
    return studao.findAll();
  }

  public Integer createStuservice(StudentEntity Stu) {
    String pattern = "^([a-zA-Z0-9_\\-.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$";
    Pattern r = Pattern.compile(pattern);
    if (Stu.getMail().trim().length() == 0 || !Stu.getMail().matches(pattern)) {
      return 1;
    } else if (Stu.getPwd().trim().length() == 0) {
      return 2;
    } else if (Stu.getUsername().trim().length() == 0) {
      return 3;
    } else if (Stu.getSchool().trim().length() == 0) {
      return 4;
    } else if (Stu.getStu_class().trim().length() == 0) {
      return 5;
    } else if (Stu.getSex().trim().length() == 0) {
      return 6;
    } else if (Stu.getAge() == 0) {
      return 7;
    } else if (Stu.getTelephone().trim().length() == 0) {
      return 8;

    }
    studao.save(Stu);
    return 0;
  }
}
