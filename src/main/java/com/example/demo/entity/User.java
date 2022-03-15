package com.example.demo.entity;



import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name="users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
public class User {

    @Id
    @GeneratedValue
    private UUID id;

    @NotBlank
    @Size(max=20)
    private String username;

    @NotBlank
    @Size(max=120)
    private String password;

     @NotBlank
     @Email
     @Size(max=50)
    private String email;

    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(name="user_roles",
    joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="role_id"))
    private Set<Role> roles=new HashSet<>();


    public User(){}

    public User( String username, String email, String password ){
        this.username=username;
        this.email=email;
        this.password=password;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername(){
        return username;
    }

    public String getPassword(){
        return password;
    }

    public void setUsername(String username){
         this.username=username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email){
        this.email=email;
    }


    public Set<Role> getRoles(){
        return roles;
    }

    public void setRoles(Set<Role> roles){
        this.roles=roles;
    }
    public String getEmail() {
        return email;
    }
}
