package com.easyclaim.EasyClaimBackend.Service;


import java.util.Collections;
import java.util.concurrent.ExecutionException;
import java.util.ArrayList;

import com.easyclaim.EasyClaimBackend.Entity.SimilarClaim;
import org.springframework.stereotype.Service;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class GetSimilarLifeClaimService {

    private final GetLifeClaimService LIFE_CLAIM_SERVICE = new GetLifeClaimService();

    public ArrayList<SimilarClaim> getSimilarLifeClaims(String claimNumber) throws InterruptedException,
            ExecutionException {

        // Collecting all historical life claims
        final int NUMBER_OF_RECS = 5;
        ArrayList<LifeClaim> historicalLifeClaims = this.LIFE_CLAIM_SERVICE.getLifeClaims("Historical");

        // Creating iterable object for current life claims
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
            return null;
        }

        // Finding similarity scores for each historical claim
        int score;
        SimilarClaim similarClaim;
        ArrayList<SimilarClaim> similarClaims = new ArrayList<SimilarClaim>();
        for (LifeClaim historicalClaim: historicalLifeClaims) {

            // Getting similarity score and creating similar claim object
            score = this.compareLifeClaims(currentClaim, historicalClaim);
            similarClaim = new SimilarClaim(score, historicalClaim);

            // Checking current count
            if (similarClaims.size() < NUMBER_OF_RECS) {
                similarClaims.add(similarClaim);
            }else {
                SimilarClaim minClaim = Collections.min(similarClaims, SimilarClaim::compareTo);
                if (score > minClaim.getSimilarityScore()) {  // checking for better score
                    int index = similarClaims.indexOf(minClaim);
                    similarClaims.set(index, similarClaim);  // replacing worst score
                }
            }

        }
        return similarClaims;

    }

    private int compareLifeClaims(LifeClaim claimOne, LifeClaim claimTwo) {

        // Setting up score variables
        float currentTotal = 0;
        final float OVERALL_TOTAL = 11;

        // Section 1 - Medical Information Calculations
        int dateOne = Integer.parseInt(claimOne.getDateOccured().split("-")[2]);
        int dateTwo = Integer.parseInt(claimTwo.getDateOccured().split("-")[2]);
        if (Math.abs(dateOne - dateTwo) <= 5) {
            currentTotal += 0.2f;
        }
        if (claimOne.getPlaceOfDeath().equals(claimTwo.getPlaceOfDeath())) {
            currentTotal += 0.3f;
        }
        if (claimOne.isInquestHeld() == claimTwo.isInquestHeld()) {
            currentTotal += 0.5f;
        }
        if (claimOne.isAutopsyPerformed() == claimTwo.isAutopsyPerformed()) {
            currentTotal += 0.6f;
        }
        if (claimOne.getMedicalInformation().getCauseOfDeath().equals(claimTwo.getMedicalInformation()
                .getCauseOfDeath())) {
            currentTotal += 0.6f;
        }
        if (claimOne.getMedicalInformation().getCauseOfDeath().equals(claimTwo.getMedicalInformation()
                .getCauseOfDeath())) {
            currentTotal += 0.3f;
        }
        if (claimOne.getMedicalInformation().isHospitalized() == claimTwo.getMedicalInformation()
                .isHospitalized()) {
            currentTotal += 0.4f;
        }

        // Section 2 - Employment Information Calculations
        if (claimOne.getEmploymentInformation().getOccupation().equals(claimTwo.getEmploymentInformation()
                .getOccupation())) {
            currentTotal += 0.8f;
        }

        // Section 3 - General Loan Information Calculations
        if (claimOne.getGeneralLoanInformation().getNameOfLendingInstitution().equals(claimTwo
                .getGeneralLoanInformation().getNameOfLendingInstitution())) {
            currentTotal += 0.4f;
        }

        // Section 3A - Loan A Information Calculations
        if (claimOne.getGeneralLoanInformation().getLoanA().getTypeOrPurposeOfLoan().equals(claimTwo
                .getGeneralLoanInformation().getLoanA().getTypeOrPurposeOfLoan())) {
            currentTotal += 0.7f;
        }
        currentTotal += this.getIntervalScore(0.5f, 0.08f, claimOne.getGeneralLoanInformation().getLoanA()
                .getOriginalAmountOfLoan(), claimTwo.getGeneralLoanInformation().getLoanA().getOriginalAmountOfLoan());
        currentTotal += this.getIntervalScore(0.6f, 0.08f, claimOne.getGeneralLoanInformation().getLoanA()
                .getAmountOfInsuranceAppliedFor(), claimTwo.getGeneralLoanInformation().getLoanA()
                .getAmountOfInsuranceAppliedFor());
        currentTotal += this.getIntervalScore(0.5f, 0.08f, claimOne.getGeneralLoanInformation().getLoanA()
                .getBalanceOnDateOfDeath(), claimTwo.getGeneralLoanInformation().getLoanA().getBalanceOnDateOfDeath());

        // Section 3B - Loan B Information Calculations
        if (claimOne.getGeneralLoanInformation().getLoanB().getTypeOrPurposeOfLoan().equals(claimTwo
                .getGeneralLoanInformation().getLoanB().getTypeOrPurposeOfLoan())) {
            currentTotal += 0.7f;
        }
        currentTotal += this.getIntervalScore(0.5f, 0.08f, claimOne.getGeneralLoanInformation().getLoanB()
                .getOriginalAmountOfLoan(), claimTwo.getGeneralLoanInformation().getLoanB().getOriginalAmountOfLoan());
        currentTotal += this.getIntervalScore(0.6f, 0.08f, claimOne.getGeneralLoanInformation().getLoanB()
                .getAmountOfInsuranceAppliedFor(), claimTwo.getGeneralLoanInformation().getLoanB()
                .getAmountOfInsuranceAppliedFor());
        currentTotal += this.getIntervalScore(0.5f, 0.08f, claimOne.getGeneralLoanInformation().getLoanB()
                .getBalanceOnDateOfDeath(), claimTwo.getGeneralLoanInformation().getLoanB().getBalanceOnDateOfDeath());

        // Section 3C - Loan C Information Calculations
        if (claimOne.getGeneralLoanInformation().getLoanC().getTypeOrPurposeOfLoan().equals(claimTwo
                .getGeneralLoanInformation().getLoanC().getTypeOrPurposeOfLoan())) {
            currentTotal += 0.7f;
        }
        currentTotal += this.getIntervalScore(0.5f, 0.08f, claimOne.getGeneralLoanInformation().getLoanC()
                .getOriginalAmountOfLoan(), claimTwo.getGeneralLoanInformation().getLoanC().getOriginalAmountOfLoan());
        currentTotal += this.getIntervalScore(0.6f, 0.08f, claimOne.getGeneralLoanInformation().getLoanC()
                .getAmountOfInsuranceAppliedFor(), claimTwo.getGeneralLoanInformation().getLoanC()
                .getAmountOfInsuranceAppliedFor());
        currentTotal += this.getIntervalScore(0.5f, 0.08f, claimOne.getGeneralLoanInformation().getLoanC()
                .getBalanceOnDateOfDeath(), claimTwo.getGeneralLoanInformation().getLoanC().getBalanceOnDateOfDeath());

        // Returning final percentage score
        return Math.round(100 * currentTotal / OVERALL_TOTAL);

    }

    private float getIntervalScore(float max, float punish, int numberOne, int numberTwo) {
        int intervalOne = numberOne / 10000;
        int intervalTwo = numberTwo / 10000;
        int gap = Math.abs(intervalOne - intervalTwo);
        return max - gap * punish;
    }

}
