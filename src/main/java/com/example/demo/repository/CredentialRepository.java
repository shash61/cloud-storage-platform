package com.example.demo.repository;

import com.example.demo.entity.Credential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CredentialRepository extends JpaRepository<Credential, UUID> {
//  @Query("SELECT c FROM credentials c WHERE c.user_id= ?1")
  List<Credential> findAllByUserId(UUID userId);
  Credential deleteById(Long id);
  Credential findById(Long id);
}
