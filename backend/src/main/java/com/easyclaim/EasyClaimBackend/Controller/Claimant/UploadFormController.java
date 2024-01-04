package com.easyclaim.EasyClaimBackend.Controller.Claimant;


import com.easyclaim.EasyClaimBackend.UseCase.Claimant.UploadFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@RestController
@RequestMapping("/claimant")
public class UploadFormController {

    private final UploadFormService service;

    @Autowired
    public UploadFormController(UploadFormService service) {this.service = service;}

    @PostMapping("/uploadForm")
    public String uploadForm(@RequestParam(value="file") MultipartFile file, @RequestParam(value="uid") String uid,
                             @RequestParam(value="fileName") String fileName) throws IOException {
        return service.uploadFile(file, uid + "/" + fileName);
    }


}
