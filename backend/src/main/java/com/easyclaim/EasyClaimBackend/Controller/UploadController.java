package com.easyclaim.EasyClaimBackend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.easyclaim.EasyClaimBackend.Service.UploadService;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
public class UploadController {

    @Autowired
    private UploadService personService;

    @PostMapping("/upload")
    public String createPerson(@RequestBody LifeClaim claim) throws ExecutionException, InterruptedException {

        return personService.uploadJson(claim);

    }

}
