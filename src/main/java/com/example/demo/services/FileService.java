package com.example.demo.services;

import com.example.demo.entity.Files;
import com.example.demo.entity.User;
import com.example.demo.payload.response.MessageResponse;
import com.example.demo.repository.FileRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FileService {
    private final FileRepository fileRepository;
    private final UserRepository userRepository;

    @Autowired
    public FileService(FileRepository fileRepository, UserRepository userRepository){
        this.fileRepository=fileRepository;
        this.userRepository=userRepository;
    }
    public void save(MultipartFile file, UUID userId) throws IOException {
        Files fileEntity = new Files();
        fileEntity.setName(StringUtils.cleanPath(file.getOriginalFilename()));
        fileEntity.setContentType(file.getContentType());
        fileEntity.setData(file.getBytes());
        fileEntity.setSize(file.getSize());
        fileEntity.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
        fileEntity.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));
        Optional<User> user=userRepository.findById(userId);
        if(user.isPresent()){
            fileEntity.setUser(user.get());
            fileRepository.save(fileEntity);
        }

    }

    public Optional<Files> getFile(String id) {
        return fileRepository.findById(id);
    }

    public List<Files> getAllFiles() {
        return fileRepository.findAll();
    }

    public List<Files> getFilesByUserId(UUID userId){

             return fileRepository.findByUserId(userId);

        }
        public ResponseEntity<?> removeFile(String id){
         // todo->check if it is the same user
            Optional<Files> file=fileRepository.findById(id);
            if(file.isPresent()){
                fileRepository.deleteById(id);
                return ResponseEntity.ok().body("deleted successfully");
            }
            else return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("some error occurred");
        }
//    public ResponseEntity<?> update(){
//
//    }
}
