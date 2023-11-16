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
    private UploadService uploadService;

    @PostMapping("/upload_life/current")
    public String uploadCurrentLife(@RequestBody LifeClaim claim) throws ExecutionException, InterruptedException {

        return uploadService.uploadCurrentLife(claim);

    }

    @PostMapping("/upload_life/historical")
    public String uploadHistoricalLife(@RequestBody LifeClaim claim) throws ExecutionException, InterruptedException {

        return uploadService.uploadHistoricalLife(claim);

    }

}
