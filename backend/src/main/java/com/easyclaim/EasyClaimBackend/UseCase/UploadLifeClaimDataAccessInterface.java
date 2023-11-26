package com.easyclaim.EasyClaimBackend.UseCase;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;

import java.util.concurrent.ExecutionException;

public interface UploadLifeClaimDataAccessInterface {

    String uploadCurrentLife(LifeClaim claim) throws ExecutionException, InterruptedException;

    String uploadHistoricalLife(LifeClaim claim) throws ExecutionException, InterruptedException;
}
