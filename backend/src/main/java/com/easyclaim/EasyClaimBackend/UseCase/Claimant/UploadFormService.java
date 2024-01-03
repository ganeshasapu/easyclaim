package com.easyclaim.EasyClaimBackend.UseCase.Claimant;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
@RequiredArgsConstructor
public class UploadFormService {

    private final UploadFormDataAccessInterface dao;

    @Value("${application.bucket.name}")
    private String bucketName;

    @Autowired
    private AmazonS3 bucket;
    public String uploadFile(File file) {
        PutObjectRequest req = new PutObjectRequest(bucketName, "new_file", file);
        bucket.putObject(req);
        return "file added";
    }
}
