package fcu.iecs.volunteer.dao;

import fcu.iecs.volunteer.model.TestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TestService {
  @Autowired
  TestDao testdao;

  public Iterable<TestEntity> getTest() {
    return testdao.findAll();
  }

  public Integer createTestService(TestEntity test) {
    testdao.save(test);
    return 0;
  }
}

