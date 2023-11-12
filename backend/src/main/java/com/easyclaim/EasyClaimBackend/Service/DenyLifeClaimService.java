package com.easyclaim.EasyClaimBackend.Service;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;


import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.WriteResult;
import com.google.cloud.firestore.DocumentSnapshot;

import java.util.Collections;

import com.easyclaim.EasyClaimBackend.Entity.SimilarClaim;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class DenyLifeClaimService {

    private final UploadService UPLOAD_SERVICE = new UploadService();
    
    public void denyClaim(String claimNumber) throws InterruptedException, ExecutionException {

        LifeClaim currentClaim = null;
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Iterable<DocumentReference> refs = dbFirestore.collection("Current Claims").document("Life")
                .collection("Claims").listDocuments();

        // Iterating through all current life claims
        for (DocumentReference ref: refs) {
            ApiFuture<DocumentSnapshot> futureSnapshot = ref.get();
            DocumentSnapshot doc = futureSnapshot.get();

            // Parsing document into LifeClaim object and checking claimNumber attribute
            if (doc.exists()) {
                currentClaim = doc.toObject(LifeClaim.class);
                assert currentClaim != null;
                if (currentClaim.getClaimNumber().equals(claimNumber)) {
                    break;
                }
            }
        }

        // Returning null if current claim is not present in database
        if (currentClaim == null) {
            ;
        }
        // If claim is found, changes status to Denied and moves from Current to Historical
        else{
            currentClaim.setStatus("Denied");
            UPLOAD_SERVICE.uploadHistoricalLife(currentClaim);
            // TODO: move to historical
            ApiFuture<WriteResult> writeResult = dbFirestore.collection("Current Claims").document("Life").collection("Claims").document(currentClaim.getClaimNumber()).delete();
        
    }
    
}

}