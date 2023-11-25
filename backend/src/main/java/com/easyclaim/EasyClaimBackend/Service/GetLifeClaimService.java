package com.easyclaim.EasyClaimBackend.Service;

import java.util.concurrent.ExecutionException;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class GetLifeClaimService {

  public ArrayList<LifeClaim> getLifeClaims(String type) throws InterruptedException, ExecutionException {
    ArrayList<LifeClaim> claims = new ArrayList<LifeClaim>();
    Firestore dbFirestore = FirestoreClient.getFirestore();
    String collectionName = type + " Claims";
    Iterable<DocumentReference> refs = dbFirestore.collection(collectionName).document("Life")
    .collection("Claims").listDocuments();
    for (DocumentReference ref: refs) {
      ApiFuture<DocumentSnapshot> futureSnapshot = ref.get();
      DocumentSnapshot doc = futureSnapshot.get();
      if (doc.exists()) {
        claims.add(doc.toObject(LifeClaim.class));
      }
    }
    if (!claims.isEmpty()) {
      return claims;
    } else {
      return null;
    }
  }

  public LifeClaim findLifeClaim(String claimNumber) throws ExecutionException, InterruptedException {
    Firestore dbFirestore = FirestoreClient.getFirestore();
    DocumentReference docRef_current = dbFirestore.collection("Current Claims").document("Life").collection("Claims").document(claimNumber);
    ApiFuture<DocumentSnapshot> future_current = docRef_current.get();
    DocumentSnapshot document_current = future_current.get();

    DocumentReference docRef_historical = dbFirestore.collection("Historical Claims").document("Life").collection("Claims").document(claimNumber);
    ApiFuture<DocumentSnapshot> future_historical = docRef_historical.get();
    DocumentSnapshot document_historical = future_historical.get();
    if (document_historical.exists()) {
      return document_historical.toObject(LifeClaim.class);
    } else if (document_current.exists()){
      return document_current.toObject(LifeClaim.class);
    } else{
      return null;
    }
  }
}
