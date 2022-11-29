package fcu.iecs.volunteer;

import fcu.iecs.volunteer.model.User;
import fcu.iecs.volunteer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.swing.text.html.Option;
import java.util.Optional;

@SpringBootApplication
public class App {



  public static void main(String[] args) {

    SpringApplication.run(App.class, args);


  }

}
