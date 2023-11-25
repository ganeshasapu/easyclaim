package com.easyclaim.EasyClaimBackend.DataAccess;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.easyclaim.EasyClaimBackend.UseCase.DeleteLifeClaimDataAccessInterface;
import com.easyclaim.EasyClaimBackend.UseCase.GetLifeClaimsDataAccessInterface;
import com.easyclaim.EasyClaimBackend.UseCase.UploadLifeClaimDataAccessInterface;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

@Service
public class AllClaimsDataAccessObject implements GetLifeClaimsDataAccessInterface, DeleteLifeClaimDataAccessInterface,
         UploadLifeClaimDataAccessInterface {
    @Override
    public ArrayList<LifeClaim> getLifeClaims(String type) throws ExecutionException, InterruptedException {
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

    @Override
    public void deleteLifeClaim(String type, String claimNumber) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        dbFirestore.collection(type + " Claims").document("Life").collection("Claims")
                .document(claimNumber).delete();

    }

    @Override
    public LifeClaim findLifeClaim(String type, String claimNumber) throws ExecutionException, InterruptedException {
        // Creating iterable object for current life claims
        LifeClaim currentClaim = null;
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Iterable<DocumentReference> refs = dbFirestore.collection(type + " Claims").document("Life")
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
        return currentClaim;
    }

    @Override
    public String uploadCurrentLife(LifeClaim claim) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection("Current Claims").document("Life").collection("Claims")
                .document(claim.getClaimNumber()).set(claim);
        return collectionApiFuture.get().getUpdateTime().toString();
    }

    @Override
    public String uploadHistoricalLife(LifeClaim claim) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection("Historical Claims").document("Life").collection("Claims")
                .document(claim.getClaimNumber()).set(claim);
        return collectionApiFuture.get().getUpdateTime().toString();
    }
}
