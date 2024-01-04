package com.easyclaim.EasyClaimBackend.DataAccess;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.easyclaim.EasyClaimBackend.UseCase.Claimant.UploadFormDataAccessInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
@RequiredArgsConstructor
public class ClaimantDataAccessObject implements UploadFormDataAccessInterface {

    private final AmazonS3 bucket;

    @Override
    public String uploadFile(File file, String fileName) throws com.amazonaws.SdkClientException {
        PutObjectRequest req = new PutObjectRequest("easyclaim-storage", fileName, file);
        try {
            this.bucket.putObject(req);
            return "file added";
        } catch (com.amazonaws.SdkClientException e) {
            return "Error: could not upload file";
        }

    }
}
