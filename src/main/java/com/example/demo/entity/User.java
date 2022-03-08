package com.example.demo.entity;


import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
//import java..LocalDate;
import java.util.UUID;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private String password;
    private Timestamp createdAt;
    private Timestamp lastloginAt;

    public User(){}
    public User(String username, String password, Timestamp createdAt, Timestamp lastloginAt){
       this.username=username;
       this.password=password;
       this.createdAt=createdAt;
       this.lastloginAt=lastloginAt;
    }

    public String getUsername(){
        return username;
    }

    public String getPassword(){
        return password;
    }

    public Timestamp getCreatedAt(){
        return createdAt;
    }

    public Timestamp getLastloginAt(){
        return lastloginAt;
    }

    public void setUsername(String username){
         this.username=username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setLastloginAt(Timestamp lastloginAt) {
        this.lastloginAt = lastloginAt;
    }
}
