package com.example.demo.Controllers;

import com.example.demo.entity.Files;
import com.example.demo.entity.User;
import com.example.demo.payload.response.FileResponse;
import com.example.demo.repository.UserRepository;
import com.example.demo.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/test/files")
public class FilesController {

  private final FileService fileService;
  private final UserRepository userRepository;

  @Autowired
  public FilesController(FileService fileService, UserRepository userRepository) {
    this.fileService = fileService;
    this.userRepository = userRepository;
  }


//  @PreAuthorize("hasRole('USER')")
//  @GetMapping("")
//    public String testing(){
//      return "hello";
//  }

  @PreAuthorize("hasRole('USER')")
  @PostMapping("/add/{userId}")
  public ResponseEntity<String> upload(@PathVariable UUID userId, @RequestParam("file") MultipartFile file) {
    try {

      fileService.save(file, userId);
      return ResponseEntity.status(HttpStatus.OK).body(String.format("File uploaded successfully: %s", file.getOriginalFilename()));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(String.format("Could not upload the file: %s", file.getOriginalFilename()));
    }

  }

  @PreAuthorize("hasRole('USER')")
  @GetMapping("")
  public List<FileResponse> list() {
    return fileService.getAllFiles().stream().map(this::mapToFileResponse).collect(Collectors.toList());
  }

  //
  @PreAuthorize("hasRole('USER')")
  @GetMapping("/{userId}")
  public List<Files> getFilesOfUser(@PathVariable UUID userId) {
    return fileService.getFilesByUserId(userId);
//      .stream().map(this::mapToFileResponse).collect(Collectors.toList());
//      System.out.println(fileResponses);
////       Optional<User> user=userRepository.findById(userId);
////       if(user.isPresent()){
////        for(FileResponse f:fileResponses){
////          f.setUid(f.getUser().getId());
////        }
////        System.out.println(fileResponses);
//         return ResponseEntity.status(HttpStatus.OK).body(fileResponses);
//       }
//       else return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("user not found with this user id");

  }


  private FileResponse mapToFileResponse(Files file) {
    String downloadUrl = ServletUriComponentsBuilder.fromCurrentContextPath().path("/files/").path(file.getId()).toUriString();
    FileResponse fileResponse = new FileResponse();
    fileResponse.setId(file.getId());
    fileResponse.setName(file.getName());
    fileResponse.setContentType(file.getContentType());
    fileResponse.setSize(file.getSize());
    fileResponse.setCreatedAt(file.getCreatedAt());
    fileResponse.setUpdatedAt(file.getUpdatedAt());
    fileResponse.setUid(file.getUser().getId());
    fileResponse.setUserName(file.getUser().getUsername());
    fileResponse.setUrl(downloadUrl);

    return fileResponse;
  }

  @PreAuthorize("hasRole('USER')")
  @DeleteMapping("delete/{id}")
  public ResponseEntity<?> deleteFile(@PathVariable String id) {
    return fileService.removeFile(id);
  }


//  @PreAuthorize("hasRole('USER')")
//  @PutMapping("update/{id}")
//  public ResponseEntity<?> updateFile(@PathVariable String id) {
//    return fileService.update();
//  }


//  @GetMapping("download/{id}")
//  public ResponseEntity<Resource> getFile(@PathVariable String id) {
//    Optional<Files> fileOptional = fileService.getFile(id);
//    if (!fileOptional.isPresent()) {
//      return ResponseEntity.notFound().build();
//    }
//    Files file = fileOptional.get();
//    return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"").contentType(MediaType.valueOf(file.getContentType())).body(file.getData());
//  }
//@PreAuthorize("hasRole('USER')")
  @GetMapping("/download/{id}")
  public ResponseEntity<Resource> downloadFile(@PathVariable String id) {
    // Load file from database
    Optional<Files> fileOptional = fileService.getFile(id);
    if (!fileOptional.isPresent()) {
      return ResponseEntity.notFound().build();
    }
    Files file = fileOptional.get();
    return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(file.getContentType()))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
            .body(new ByteArrayResource(file.getData()));
  }
}