package com.easyclaim.EasyClaimBackend.UseCase.Claimant;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UploadFormService {

    private final UploadFormDataAccessInterface dao;


    private File convertFile(MultipartFile file) {
        File newFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        try (OutputStream os = new FileOutputStream(newFile)) {
            os.write(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return newFile;
    }
    public String uploadFile(MultipartFile file, String fileName) {
        File newFile = convertFile(file);
        String result = dao.uploadFile(newFile, fileName);
        boolean deleted = newFile.delete();
        if (!deleted) {
            result += ", and the file was not deleted from the local storage";
        }
        return result;


    }
}
