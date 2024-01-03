package com.easyclaim.EasyClaimBackend.Controller.Claimant;


import com.easyclaim.EasyClaimBackend.UseCase.Claimant.UploadFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Objects;

@RestController
@RequestMapping("/api")
public class UploadFormController {

    private final UploadFormService service;

    @Autowired
    public UploadFormController(UploadFormService service) {this.service = service;}

    @PostMapping("/uploadForm")
    public String uploadForm(@RequestParam(value="file") MultipartFile file)  {
        File newFile = convertFile(file);
        return service.uploadFile(newFile);
    }

    private File convertFile(MultipartFile file) {
        File newFile = new File("src/main/resources/testFile.pdf");
        try (OutputStream os = new FileOutputStream(newFile)) {
            os.write(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return newFile;
    }

}
