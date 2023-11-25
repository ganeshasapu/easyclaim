package com.easyclaim.EasyClaimBackend.UseCase;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient; 

@Service
public class UploadService {

  @Autowired
  UploadLifeClaimDataAccessInterface dataAccessObject;

  public String uploadCurrentLife(LifeClaim claim) throws ExecutionException, InterruptedException{
    return this.dataAccessObject.uploadCurrentLife(claim);

  }

  public String uploadHistoricalLife(LifeClaim claim) throws InterruptedException, ExecutionException {
    return this.dataAccessObject.uploadHistoricalLife(claim);

  }

 
  
}
