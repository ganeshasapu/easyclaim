package com.easyclaim.EasyClaimBackend.Service;

import java.util.List;
import java.util.PriorityQueue;
import java.util.concurrent.ExecutionException;
import java.util.ArrayList;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.easyclaim.EasyClaimBackend.Entity.SimilarClaim;

import org.springframework.stereotype.Service;

@Service
public class GetSimilarLifeClaimService {

    private final GetLifeClaimService LIFE_CLAIM_SERVICE = new GetLifeClaimService();
    private final GetSingleLifeClaimService SINGLE_LIFE_CLAIM_SERVICE = new GetSingleLifeClaimService();

    public List<SimilarClaim> getSimilarLifeClaims(String claimNumber) throws InterruptedException,
            ExecutionException {

        // Collecting all historical life claims
        final int NUMBER_OF_RECS = 5;
        ArrayList<LifeClaim> historicalLifeClaims = this.LIFE_CLAIM_SERVICE.getLifeClaims("Historical");

        // Finding claim in database
        LifeClaim currentClaim = this.SINGLE_LIFE_CLAIM_SERVICE.findLifeClaim("Current", claimNumber);
        if (currentClaim == null) {
            return null;
        }

        // Finding top "NUMBER_OF_RECS" scores in n*log(k) steps
        int score;
        SimilarClaim similarClaim;
        CompareClaimService compareClaimService = new CompareClaimService();
        PriorityQueue<SimilarClaim> minHeap = new PriorityQueue<>(SimilarClaim::compareTo);
        for (LifeClaim historicalClaim: historicalLifeClaims) {

            // Getting similarity score and creating similar claim object
            score = compareClaimService.getComparisonScore(currentClaim, historicalClaim);
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
