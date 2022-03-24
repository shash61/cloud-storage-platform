package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
//  User findByUsername(String username);
  Boolean existsByUsername(String username);
  Optional<User> findByUsername(String username);
  Boolean existsByEmail(String email);

}
