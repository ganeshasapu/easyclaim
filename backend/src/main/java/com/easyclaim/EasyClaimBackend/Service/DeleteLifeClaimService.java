package com.easyclaim.EasyClaimBackend.Service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

public class DeleteLifeClaimService {

    public DeleteLifeClaimService() {}

    public void deleteLifeClaim(String type, String claimNumber) {

        Firestore dbFirestore = FirestoreClient.getFirestore();
        dbFirestore.collection(type + " Claims").document("Life").collection("Claims")
                .document(claimNumber).delete();

    }

}
