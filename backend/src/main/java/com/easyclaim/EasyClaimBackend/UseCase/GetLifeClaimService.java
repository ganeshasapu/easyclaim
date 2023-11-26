package com.easyclaim.EasyClaimBackend.UseCase;

import java.util.concurrent.ExecutionException;
import java.util.ArrayList;

import com.easyclaim.EasyClaimBackend.UseCase.GetLifeClaimsDataAccessInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class GetLifeClaimService {

  @Autowired
  private GetLifeClaimsDataAccessInterface dataAccessObject;


  public ArrayList<LifeClaim> getLifeClaims(String type) throws InterruptedException, ExecutionException {
    return this.dataAccessObject.getLifeClaims(type);

  }

  public LifeClaim findLifeClaim(String claimNumber) throws ExecutionException, InterruptedException {
    return this.dataAccessObject.findLifeClaim(claimNumber);
  }
}
