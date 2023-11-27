package com.easyclaim.EasyClaimBackend.UseCase;

import java.util.concurrent.ExecutionException;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient; 

@Service
@RequiredArgsConstructor
public class UploadService {

  private final UploadLifeClaimDataAccessInterface dataAccessObject;

  public String uploadLife(String type, LifeClaim claim) throws ExecutionException, InterruptedException{
    return this.dataAccessObject.uploadLife(type, claim);

  }


 
  
}
