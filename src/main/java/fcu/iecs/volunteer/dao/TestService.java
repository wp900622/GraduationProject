package fcu.iecs.volunteer.dao;

import fcu.iecs.volunteer.entity.TestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
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

