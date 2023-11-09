package com.easyclaim.EasyClaimBackend.Service;

import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient; 

@Service
public class UploadService {

  public String uploadCurrentLife(LifeClaim claim) throws ExecutionException, InterruptedException{
    Firestore dbFirestore = FirestoreClient.getFirestore();
    ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection("Current Claims").document("Life").collection("Claims")
    .document(claim.getClaimNumber()).set(claim);
    return collectionApiFuture.get().getUpdateTime().toString();
  }

  public String uploadHistoricalLife(LifeClaim claim) throws InterruptedException, ExecutionException {
    Firestore dbFirestore = FirestoreClient.getFirestore();
    ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection("Historical Claims").document("Life").collection("Claims")
    .document(claim.getClaimNumber()).set(claim);
    return collectionApiFuture.get().getUpdateTime().toString();
  }

 
  
}
