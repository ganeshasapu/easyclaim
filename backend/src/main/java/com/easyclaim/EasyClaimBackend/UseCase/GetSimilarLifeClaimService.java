package com.easyclaim.EasyClaimBackend.UseCase;

import java.util.List;
import java.util.PriorityQueue;
import java.util.concurrent.ExecutionException;
import java.util.ArrayList;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.easyclaim.EasyClaimBackend.Entity.SimilarClaim;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class GetSimilarLifeClaimService {


    private final SimilarityStrategy similarityStrategy;

    @Autowired
    private GetLifeClaimsDataAccessInterface dataAccessObject;

    @Autowired
    public GetSimilarLifeClaimService(@Qualifier("basicCompareClaimService") SimilarityStrategy similarityStrategy) {
        this.similarityStrategy = similarityStrategy;
    }


    public List<SimilarClaim> getSimilarLifeClaims(String claimNumber) throws InterruptedException,
            ExecutionException {

        // Collecting all historical life claims
        final int NUMBER_OF_RECS = 5;
        ArrayList<LifeClaim> historicalLifeClaims = LifeClaimUtility.getLifeClaims(dataAccessObject, "Historical");

        // Finding claim in database
        LifeClaim currentClaim = LifeClaimUtility.findLifeClaimOfType(dataAccessObject, "Current", claimNumber);
        if (currentClaim == null) {
            return null;
        }

        // Finding top "NUMBER_OF_RECS" scores in n*log(k) steps
        int score;
        SimilarClaim similarClaim;
        PriorityQueue<SimilarClaim> minHeap = new PriorityQueue<>(SimilarClaim::compareTo);
        for (LifeClaim historicalClaim: historicalLifeClaims) {

            // Getting similarity score and creating similar claim object
            score = similarityStrategy.getComparisonScore(currentClaim, historicalClaim);
            similarClaim = new SimilarClaim(score, historicalClaim);

            // Checking current count
            if (minHeap.size() < NUMBER_OF_RECS) {
                minHeap.add(similarClaim);  // log k steps
            }else {

                // Checking current minimum score for better score
                if (score > minHeap.peek().getSimilarityScore()) {  // Constant time
                    minHeap.remove();
                    minHeap.add(similarClaim);  // log k steps
                }
            }

        }

        // Returning list of best claims
        return minHeap.stream().toList();

    }

}
