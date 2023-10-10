package com.easyclaim.EasyClaimBackend.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.easyclaim.EasyClaimBackend.Entity.Person;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class PersonService {

    private static final String COLLECTION_NAME = "Users";

    // Defining CRUD methods for endpoints defined in the controller
    public String createPerson(Person person) throws ExecutionException, InterruptedException {

        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME)
                .document(person.getDocumentName()).set(person);
        return collectionApiFuture.get().getUpdateTime().toString();

    }

    public Person getPerson(String id) throws ExecutionException, InterruptedException {

        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> futureSnapshot = documentReference.get();
        DocumentSnapshot document = futureSnapshot.get();
        if (document.exists()) {
            return document.toObject(Person.class);
        } else {
            return null;
        }

    }

}