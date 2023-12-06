package com.easyclaim.EasyClaimBackend.DataAccess;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.easyclaim.EasyClaimBackend.UseCase.DeleteLifeClaimDataAccessInterface;
import com.easyclaim.EasyClaimBackend.UseCase.GetFilteredLifeClaimsDataAccessInterface;
import com.easyclaim.EasyClaimBackend.UseCase.GetLifeClaimsDataAccessInterface;
import com.easyclaim.EasyClaimBackend.UseCase.UploadLifeClaimDataAccessInterface;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class AllClaimsDataAccessObject implements GetLifeClaimsDataAccessInterface, DeleteLifeClaimDataAccessInterface,
         UploadLifeClaimDataAccessInterface, GetFilteredLifeClaimsDataAccessInterface {
    @Override
    public List<LifeClaim> getLifeClaims(String type) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        String collectionName = type + " Claims";

        ApiFuture<QuerySnapshot> future = dbFirestore.collection(collectionName)
                .document("Life")
                .collection("Claims")
                .get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<LifeClaim> claims = new ArrayList<>();


        for (QueryDocumentSnapshot document : documents) {
            claims.add(document.toObject(LifeClaim.class));
        }

        return claims.isEmpty() ? null : claims;
    }

    @Override
    public List<LifeClaim> getLifeClaimsPaginated(String type, String lastClaimNumber) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        if (lastClaimNumber.equals("null")) {
            ApiFuture<QuerySnapshot> future = dbFirestore.collection(type + " Claims").document("Life").collection("Claims")
                    .limit(10).get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            List<LifeClaim> claims = new ArrayList<>();

            for (QueryDocumentSnapshot document : documents) {
                claims.add(document.toObject(LifeClaim.class));
            }

            return claims.isEmpty() ? new ArrayList<>() : claims;
        }

        ApiFuture<DocumentSnapshot> lastDocFuture = dbFirestore.collection(type + " Claims").document("Life").collection("Claims")
                .document(lastClaimNumber).get();
        DocumentSnapshot lastDocSnapshot = lastDocFuture.get();

        if (!lastDocSnapshot.exists()) {
            return new ArrayList<>();
        }
        // Use the last document snapshot for pagination
        ApiFuture<QuerySnapshot> future = dbFirestore.collection(type + " Claims").document("Life").collection("Claims")
                .startAfter(lastDocSnapshot).limit(10).get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<LifeClaim> claims = new ArrayList<>();

        for (QueryDocumentSnapshot document : documents) {
            claims.add(document.toObject(LifeClaim.class));
        }

        return claims.isEmpty() ? new ArrayList<>() : claims;
    }

    @Override
    public String deleteLifeClaim(String type, String claimNumber) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        dbFirestore.collection(type + " Claims").document("Life").collection("Claims")
                .document(claimNumber).delete();

        return claimNumber;

    }

    @Override
    public LifeClaim findLifeClaimOfType(String type, String claimNumber) throws ExecutionException, InterruptedException {
        // Creating iterable object for current life claims
        LifeClaim currentClaim = null;
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference refs = dbFirestore.collection(type + " Claims").document("Life")
                .collection("Claims");
        ApiFuture<QuerySnapshot> future = refs.whereEqualTo("claimNumber", claimNumber).get();

        QuerySnapshot querySnapshot = future.get();

        for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
            currentClaim = document.toObject(LifeClaim.class);
        }
        return currentClaim;
    }

    @Override
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
        } else if (document_current.exists()) {
            return document_current.toObject(LifeClaim.class);
        } else {
            return null;
        }
    }

    @Override
    public String uploadLife(String type, LifeClaim claim) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(type + " Claims").document("Life").collection("Claims")
                .document(claim.getClaimNumber()).set(claim);
        return collectionApiFuture.get().getUpdateTime().toString();
    }

    @Override
    public List<LifeClaim> getFilteredLifeClaims(String type, int lastClaimIndex) throws InterruptedException, ExecutionException {
        ArrayList<LifeClaim> filteredClaims = new ArrayList<>();
        Map<String, Boolean> filters = stringToDictionary(type);
        Firestore dbFirestore = FirestoreClient.getFirestore();
        String collectionName = "Historical Claims";
        CollectionReference refs = dbFirestore.collection(collectionName).document("Life")
                .collection("Claims");

        applyAmountFilter(filters, refs, filteredClaims);
        applyDateFilter(filters, refs, filteredClaims);


        if (!filteredClaims.isEmpty()) {
            if (lastClaimIndex * 10 > filteredClaims.size()) {
                return new ArrayList<>();
            }
            return filteredClaims.subList(lastClaimIndex * 10, Math.min(filteredClaims.size(), (lastClaimIndex * 10) + 10));
        } else if ((filters.get("1") || filters.get("2") || filters.get("3") ||
                filters.get("4") || filters.get("5") || filters.get("6") || filters.get("7"))){
            return new ArrayList<>();
        }else {
            List<LifeClaim> claims = getLifeClaims("Historical");
            if (lastClaimIndex * 10 > claims.size()) {
                return new ArrayList<>();
            }
            if (lastClaimIndex * 10 > claims.size()) {
                return new ArrayList<>();
            }
            List<LifeClaim> claimsSubset = claims.subList(lastClaimIndex * 10, Math.min(claims.size(), (lastClaimIndex * 10) + 10));
            return claimsSubset;
        }

    }


    private void applyAmountFilter(Map<String, Boolean> filters, CollectionReference refs, ArrayList<LifeClaim> filteredClaims)
            throws InterruptedException, ExecutionException {
        if (filters.get("1")) {
            addClaimsFromQuery(refs.whereGreaterThan("generalLoanInformation.loanA.amountOfInsuranceAppliedFor", 0)
                    .whereLessThan("generalLoanInformation.loanA.amountOfInsuranceAppliedFor", 25000).get(), filteredClaims);
        }


        if (filters.get("2")) {
            addClaimsFromQuery(refs.whereGreaterThan("generalLoanInformation.loanA.amountOfInsuranceAppliedFor", 25000)
                    .whereLessThan("generalLoanInformation.loanA.amountOfInsuranceAppliedFor", 50000).get(), filteredClaims);
        }

        if (filters.get("3")) {
            addClaimsFromQuery(refs.whereGreaterThan("generalLoanInformation.loanA.amountOfInsuranceAppliedFor", 50000).get(), filteredClaims);
        }
    }

    private void applyDateFilter(Map<String, Boolean> filters, CollectionReference refs, ArrayList<LifeClaim> filteredClaims)
            throws InterruptedException, ExecutionException {
        if (filters.get("4") && !filters.get("1") && !filters.get("2") && !filters.get("3")) {
            addClaimsFromQuery(refs.whereGreaterThan("dateOccured", subtractOneMonth()).get(), filteredClaims);
        } else if (filters.get("4") && (filters.get("1") || filters.get("2") || filters.get("3"))){
            // Date threshold
            String thresholdDate = subtractOneMonth();

            // Iterate through the list and remove items meeting the condition
            filteredClaims.removeIf(lifeClaim -> lifeClaim.getDateOccured().compareTo(thresholdDate) < 0);
        }

        if (filters.get("5") && !filters.get("1") && !filters.get("2") && !filters.get("3")) {
            addClaimsFromQuery(refs.whereGreaterThan("dateOccured", subtractLastSixMonths()).get(), filteredClaims);
        } else if (filters.get("5") && (filters.get("1") || filters.get("2") || filters.get("3"))){
            // Date threshold
            String thresholdDate = subtractLastSixMonths();

            // Iterate through the list and remove items meeting the condition
            filteredClaims.removeIf(lifeClaim -> lifeClaim.getDateOccured().compareTo(thresholdDate) < 0);
        }

        if (filters.get("6") && !filters.get("1") && !filters.get("2") && !filters.get("3")) {
            addClaimsFromQuery(refs.whereGreaterThan("dateOccured", subtractLastYear()).get(), filteredClaims);
        } else if (filters.get("6") && (filters.get("1") || filters.get("2") || filters.get("3"))){
            // Date threshold
            String thresholdDate = subtractLastYear();

            // Iterate through the list and remove items meeting the condition
            filteredClaims.removeIf(lifeClaim -> lifeClaim.getDateOccured().compareTo(thresholdDate) < 0);
        }

        if (filters.get("7") && !filters.get("1") && !filters.get("2") && !filters.get("3")) {
            addClaimsFromQuery(refs.whereLessThan("dateOccured", subtractLastYear()).get(), filteredClaims);
        } else if (filters.get("7") && (filters.get("1") || filters.get("2") || filters.get("3"))){
            // Date threshold
            String thresholdDate = subtractLastYear();

            // Iterate through the list and remove items meeting the condition
            filteredClaims.removeIf(lifeClaim -> lifeClaim.getDateOccured().compareTo(thresholdDate) > 0);
        }
    }

    private void addClaimsFromQuery(ApiFuture<QuerySnapshot> future, ArrayList<LifeClaim> filteredClaims)
            throws InterruptedException, ExecutionException {
        QuerySnapshot querySnapshot = future.get();
        for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
            if (!filteredClaims.contains(document.toObject(LifeClaim.class))) {
                filteredClaims.add(document.toObject(LifeClaim.class));
            }
        }
    }

    private static Map<String, Boolean> stringToDictionary(String inputString) {
        Map<String, Boolean> result = new HashMap<>();

        String[] keyValuePairs = inputString.split("&");
        for (String pair : keyValuePairs) {
            String[] keyValue = pair.split("=");
            String key = keyValue[0];
            String value = keyValue[1];

            // Convert 'true' or 'false' strings to boolean
            boolean booleanValue = value.equals("true");

            result.put(key, booleanValue);
        }

        return result;
    }

    private static String subtractOneMonth() {
        // Get today's date
        LocalDate today = LocalDate.now();

        // Subtract one month
        LocalDate oneMonthAgo = today.minusMonths(1);

        // Define the desired date format
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // Format the resulting date
        String formattedDate = oneMonthAgo.format(formatter);

        return formattedDate;
    }

    private static String subtractLastSixMonths() {
        // Get today's date
        LocalDate today = LocalDate.now();

        // Subtract six months
        LocalDate lastSixMonths = today.minusMonths(6);

        // Define the desired date format
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // Format the resulting date
        String formattedDate = lastSixMonths.format(formatter);

        return formattedDate;
    }

    private static String subtractLastYear() {
        // Get today's date
        LocalDate today = LocalDate.now();

        // Subtract one year
        LocalDate lastYear = today.minusYears(1);

        // Define the desired date format
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // Format the resulting date
        String formattedDate = lastYear.format(formatter);

        return formattedDate;
    }
}
