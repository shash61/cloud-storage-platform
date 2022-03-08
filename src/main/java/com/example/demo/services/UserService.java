package com.example.demo.services;


import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
  private final UserRepository userRepository;

  @Autowired
  public UserService (UserRepository userRepository){
      this.userRepository=userRepository;
  }

  public User addUser(User user){
      Optional<User> username=userRepository.findByusername(user.getUsername());
      if(username.isPresent()) throw new IllegalStateException("user already exists");
      else {
          BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
          String encodedPass=passwordEncoder.encode(user.getPassword());
          user.setPassword(encodedPass);
          return userRepository.save(user);
      }
  };


}
