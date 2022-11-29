package fcu.iecs.volunteer.security;

import fcu.iecs.volunteer.security.jwt.AuthEntryPointJwt;
import fcu.iecs.volunteer.security.jwt.AuthTokenFilter;
import fcu.iecs.volunteer.security.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
    // securedEnabled = true,
    // jsr250Enabled = true,
    prePostEnabled = true)
public class WebSecurityConfig {

  @Autowired
  private AuthEntryPointJwt unauthorizedHandler;

  @Autowired
  private AuthService authService;

  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(authService);
    authProvider.setPasswordEncoder(passwordEncoder());

    return authProvider;
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.cors().and().csrf().disable()
        .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
        .authorizeRequests().antMatchers("/api/auth/**").permitAll().and()
        .authorizeRequests().antMatchers("/api/public/**").permitAll().and()
        .authorizeRequests().antMatchers("/api/test/**").permitAll().and()
            .authorizeRequests().antMatchers("/api/school").permitAll().and()
            .authorizeRequests().antMatchers("/api/exam/post").hasAnyAuthority("Volunteer","School").and()
            .authorizeRequests().antMatchers("/api/exam/{id}").hasAnyAuthority("Student","School").and()
            .authorizeRequests().antMatchers("/api/news/post").hasAnyAuthority("School").and()
            .authorizeRequests().antMatchers("api/news/serch**").permitAll().and()
            .authorizeRequests().antMatchers("api/news/{name}").permitAll().and()
            .authorizeRequests().antMatchers("/api/match/post").hasAnyAuthority("Volunteer").and()
            .authorizeRequests().antMatchers("/api/match/").hasAnyAuthority("School").and()
            .authorizeRequests().antMatchers("/api/match/post").hasAnyAuthority("Volunteer","School")
        .anyRequest().authenticated();

    http.authenticationProvider(authenticationProvider());
    http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}
