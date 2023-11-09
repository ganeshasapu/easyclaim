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
  
}
