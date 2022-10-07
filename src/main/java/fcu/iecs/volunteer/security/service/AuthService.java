package fcu.iecs.volunteer.security.service;

import fcu.iecs.volunteer.model.User;
import fcu.iecs.volunteer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;

  /*@Autowired
  private AuthenticationManager authenticationManager;*/

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

    Optional<User> instance = userRepository.findByEmail(email);
    if (instance.isPresent()) {
      return UserDetailsImpl.build(instance.get());
    }

    throw new UsernameNotFoundException("User Not Found with email: " + email);
  }
}
