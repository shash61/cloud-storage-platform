package com.example.demo.Controllers;

import com.example.demo.entity.User;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    private final UserService userService;
    public UserController(UserService userService){
        this.userService=userService;
    }

    @GetMapping("/")
    public String test(){
        return "Hello";
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/api/signup")
    public User registerUser(@RequestBody User user){
     return userService.addUser(user);
    };
}

