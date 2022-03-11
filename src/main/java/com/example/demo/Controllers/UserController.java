package com.example.demo.Controllers;

import com.example.demo.entity.User;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class UserController {
    @Autowired
    private final UserService userService;
    public UserController(UserService userService){
        this.userService=userService;
    }

    @GetMapping("/api/{id}")
    public Optional<User> test(@PathVariable("id") UUID id){

        return userService.getAllUsers(id);
    }

    @GetMapping("/test")
    public String testEquality(@RequestBody User user){
        return userService.testEquality(user);
    }


    @PostMapping("/api/signup")
    public User registerUser(@RequestBody User user){
     return userService.addUser(user);
    };


    @PostMapping("/api/login")
    public User login(@RequestBody User user){
        System.out.println(user);
      return userService.loginUser(user);
    };

    
}

