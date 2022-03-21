package com.example.demo.Controllers;


import com.example.demo.entity.Credential;
import com.example.demo.entity.User;
import com.example.demo.payload.response.MessageResponse;
import com.example.demo.repository.CredentialRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/test/credentials")
public class CredentialController {
    @Autowired
    private CredentialRepository credentialRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    @PreAuthorize("hasRole('USER')")
    public String test(){
        return "testing complete";
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/add/{userId}")
    public ResponseEntity<?> addCredential(@PathVariable UUID userId, @Valid @RequestBody Credential credential){
        System.out.println(credential);
        Optional<User> user=userRepository.findById(userId);
        if(user.isPresent()){
            credential.setUser(user.get());
            credentialRepository.save(credential);
            return ResponseEntity.ok(new MessageResponse("credential stored"));
        }
        else return ResponseEntity.ok(new MessageResponse("some error"));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getCredentials(@PathVariable UUID userId){
      Optional<User> user=userRepository.findById(userId);
      List<Credential> credentials=new ArrayList<>();
      if(user.isPresent()) {
          credentials = credentialRepository.findAllByUserId(userId);
          for(Credential c:credentials ){
              c.setUid(c.getUser().getId());
      }
          return ResponseEntity.ok().body(credentials);
      }
      else return ResponseEntity.ok(new MessageResponse("user id is not authorized"));
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/delete/{credentialId}")
    public ResponseEntity<?> deleteCredential(@PathVariable Long credentialId, @RequestParam UUID userId, @RequestBody Credential credential){
        System.out.println(credentialId);
        System.out.println(userId);
        System.out.println(credential);
        credentialRepository.delete(credential);

//        System.out.print(credential);
//        if(credential!=null){
//        }
         return ResponseEntity.ok(new MessageResponse("received"));
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/update/{credentialId}")
    public ResponseEntity<?> updateCredentials(@PathVariable Long credentialId,@Valid @RequestBody Credential credential, @RequestParam UUID uuserId){
        Credential credential1=credentialRepository.findById(credentialId);
        Optional<User> user=userRepository.findById(userId);

        System.out.println(credential1);
        credential1=credential;
        if(user.isPresent()){
            credential1.setUser(user.get());
            credentialRepository.save(credential1);
            return ResponseEntity.ok(new MessageResponse("credential stored"));
        }
        System.out.println(credential1);
        return ResponseEntity.ok(new MessageResponse("updating"));
    }
}
