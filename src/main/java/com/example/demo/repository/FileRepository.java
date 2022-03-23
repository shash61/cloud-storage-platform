package com.example.demo.repository;

import com.example.demo.entity.Files;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FileRepository extends JpaRepository<Files, String> {
    List<Files> findByUserId(UUID userId);
}
