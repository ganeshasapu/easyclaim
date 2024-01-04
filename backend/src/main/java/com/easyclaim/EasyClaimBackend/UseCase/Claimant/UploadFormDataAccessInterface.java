package com.easyclaim.EasyClaimBackend.UseCase.Claimant;

import java.io.File;

public interface UploadFormDataAccessInterface {

    String uploadFile(File file, String fileName);
}
