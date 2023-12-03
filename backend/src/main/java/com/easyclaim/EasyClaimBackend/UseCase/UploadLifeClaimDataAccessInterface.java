package com.easyclaim.EasyClaimBackend.UseCase;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;

import java.util.concurrent.ExecutionException;

public interface UploadLifeClaimDataAccessInterface {

    String uploadLife(String type, LifeClaim claim) throws ExecutionException, InterruptedException;

}
