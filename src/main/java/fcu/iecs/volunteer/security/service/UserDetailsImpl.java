package fcu.iecs.volunteer.security.service;

import fcu.iecs.volunteer.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserDetailsImpl implements UserDetails {

  private static final long serialVersionUID = 1L;

  private final Long id;

  private final String name;

  private final String email;

  private final String password;

  private final Collection<? extends GrantedAuthority> authorities;

  @Autowired
  PasswordEncoder encoder;

  public UserDetailsImpl(Long id, String name, String email, String password,
                         Collection<? extends GrantedAuthority> authorities) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
  }

  public static UserDetailsImpl build(User user) {
    List<SimpleGrantedAuthority> authorities = new ArrayList<>();
    authorities.add(new SimpleGrantedAuthority(user.getRole().getName()));

    return new UserDetailsImpl(user.getId(), user.getName(), user.getEmail(), user.getPassword(), authorities);

  }
  @Bean
  public InMemoryUserDetailsManager userDetailService(){
    UserDetails volunteer = org.springframework.security.core.userdetails.User
            .withUsername("Volunteer").password(encoder.encode("volunteerPass"))
            .roles("Volunteer").build();
    UserDetails school = org.springframework.security.core.userdetails.User
            .withUsername("School").password(encoder.encode("schoolPass"))
            .roles("School").build();
    UserDetails student = org.springframework.security.core.userdetails.User
            .withUsername("Student").
            password(encoder.encode("schoolPass"))
            .roles("Student").build();

          return new InMemoryUserDetailsManager(volunteer , school , student);
  }



  public Long getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return name;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
