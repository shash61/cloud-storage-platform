//package com.example.demo.services;
//
//
//import com.example.demo.entity.User;
//import com.example.demo.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//import java.util.UUID;
//
//@Service
//public class UserService {
//  private final UserRepository userRepository;
//
//  @Autowired
//  public UserService (UserRepository userRepository){
//      this.userRepository=userRepository;
//  }
//
//
//  public Optional<User> getAllUsers(UUID id){
//    return userRepository.findById(id);
//  };
//  public User addUser(User user){
//      User username=userRepository.findByUsername(user.getUsername());
//      if(username!=null) throw new Error("user already exists");
//      else {
//          BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
//          String encodedPass=passwordEncoder.encode(user.getPassword());
//          user.setPassword(encodedPass);
//          return userRepository.save(user);
//      }
//  };
//
//  public User loginUser(User user){
//     User loginUser=userRepository.findByUsername(user.getUsername());
//
//     if(loginUser!=null) {
//         BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
//        if(loginUser.getUsername().equals(user.getUsername()) && passwordEncoder.matches(user.getPassword(), loginUser.getPassword()) ){
//           return loginUser;
//        }
//        else throw new Error("username/password entered is wrong");
//     }
//     else throw new Error("user not found");
//
//  };
//
//  public String testEquality(User user){
//    User foundUser=userRepository.findByUsername(user.getUsername());
//    String pass="krillin";
//    String userpass=foundUser.getPassword();
//    System.out.print(pass);
//  System.out.print(userpass);
//    BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
////    String encodedPass=passwordEncoder.encode(user.getPassword());
//    if(user.getUsername().equals(foundUser.getUsername()) && passwordEncoder.matches(user.getPassword(), userpass)) return "user logged in matches";
//   else return user.getUsername() + "doesn't match"+ foundUser.getUsername();
//  };
//
//}
