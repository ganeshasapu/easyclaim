package com.easyclaim.EasyClaimBackend.UseCase;

import com.easyclaim.EasyClaimBackend.Entity.*;
import com.easyclaim.EasyClaimBackend.UseCase.Adjudication.GetLifeClaimsDataAccessInterface;
import com.easyclaim.EasyClaimBackend.UseCase.Adjudication.GetSimilarLifeClaimService;
import com.easyclaim.EasyClaimBackend.UseCase.Adjudication.SimilarityStrategy;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class GetSimilarLifeClaimServiceTests {

    private static GetSimilarLifeClaimService service;
    private static SimilarityStrategy strategy;
    private static GetLifeClaimsDataAccessInterface getLifeClaimsDao;

    private static LifeClaim claim;
    private static List<LifeClaim> historical;

    @BeforeAll
    static void setup() {
        strategy = mock(SimilarityStrategy.class);
        getLifeClaimsDao = mock(GetLifeClaimsDataAccessInterface.class);
        service = new GetSimilarLifeClaimService(strategy, getLifeClaimsDao);
        claim = new LifeClaim("0");
        historical = new ArrayList<>();
        for (int i = 1; i < 16; i++) {
            historical.add(new LifeClaim(Integer.toString(i)));
        }

    }

    @Test
    void getSimilarLifeClaims_noSuchCurrentClaimExists_nullReturned() throws ExecutionException, InterruptedException {
        when(getLifeClaimsDao.getLifeClaims("Historical")).thenReturn(historical);
        when(getLifeClaimsDao.findLifeClaimOfType(eq("Current"),
                any(String.class))).thenReturn(null);

        List<SimilarClaim> returnedClaims = service.getSimilarLifeClaims("123456");

        Assertions.assertNull(returnedClaims);

    }

    @Test
    void getSimilarLifeClaims_increasingScores_returnsHighestScoringClaims() throws ExecutionException,
            InterruptedException {
        when(getLifeClaimsDao.getLifeClaims("Historical")).thenReturn(historical);
        when(getLifeClaimsDao.findLifeClaimOfType("Current", "0")).thenReturn(claim);

        // elements from index 10 to 14 in historical have the highest similarity score
        for (int i = 0; i < historical.size(); i++) {
            when(strategy.getComparisonScore(claim, historical.get(i))).thenReturn(Math.min(10 * i, 100));
        }

        List<SimilarClaim> returnedClaims = service.getSimilarLifeClaims("0");

        for (SimilarClaim returnedClaim : returnedClaims) {
            Assertions.assertTrue(historical.subList(10, 15).contains(returnedClaim.getClaim()));
        }

    }

    @Test
    void getSimilarLifeClaims_decreasingScores_returnsHighestScoringClaims() throws ExecutionException,
            InterruptedException {
        when(getLifeClaimsDao.getLifeClaims("Historical")).thenReturn(historical);
        when(getLifeClaimsDao.findLifeClaimOfType("Current", "0")).thenReturn(claim);

        // elements from index 0 to index 4 have the highest similarity score
        for (int i = 0; i < historical.size(); i++) {
            when(strategy.getComparisonScore(claim, historical.get(i))).thenReturn(Math.max(0, 100 - 10 * i));
        }

        List<SimilarClaim> returnedClaims = service.getSimilarLifeClaims("0");

        for (SimilarClaim returnedClaim : returnedClaims) {
            Assertions.assertTrue(historical.subList(0, 5).contains(returnedClaim.getClaim()));
        }

    }

    @Test
    void getSimilarLifeClaims_extraClaimsWithHighScore_checkExtraNotAdded() throws ExecutionException,
            InterruptedException {
        List<LifeClaim> moreHistorical = historical;
        moreHistorical.add(new LifeClaim("16"));
        when(getLifeClaimsDao.getLifeClaims("Historical")).thenReturn(moreHistorical);
        when(getLifeClaimsDao.findLifeClaimOfType("Current", "0")).thenReturn(claim);

        // elements from index 10 to 15 in historical have the highest similarity score, but only elements from index
        // 10 to 14 should be included in the returned similar claims list since the function returns a maximum of 5
        // similar claims
        for (int i = 0; i < historical.size(); i++) {
            when(strategy.getComparisonScore(claim, historical.get(i))).thenReturn(Math.min(10 * i, 100));
        }

        List<SimilarClaim> returnedClaims = service.getSimilarLifeClaims("0");

        for (SimilarClaim returnedClaim : returnedClaims) {
            Assertions.assertTrue(moreHistorical.subList(10, 15).contains(returnedClaim.getClaim()));
            Assertions.assertNotSame(moreHistorical.get(15), returnedClaim.getClaim());
        }
    }

    @Test
    void getSimilarLifeClaims_noHistoricalClaims_emptyListReturned() throws ExecutionException, InterruptedException {
        List<LifeClaim> emptyList = new ArrayList<>();
        when(getLifeClaimsDao.getLifeClaims("Historical")).thenReturn(emptyList);
        when(getLifeClaimsDao.findLifeClaimOfType("Current", "0")).thenReturn(claim);

        for (int i = 0; i < emptyList.size(); i ++) {
            when(strategy.getComparisonScore(claim, historical.get(i))).thenReturn(Math.min(10 * i, 100));
        }

        List<SimilarClaim> returnedClaims = service.getSimilarLifeClaims("0");

        Assertions.assertTrue(returnedClaims.isEmpty());
    }

}
