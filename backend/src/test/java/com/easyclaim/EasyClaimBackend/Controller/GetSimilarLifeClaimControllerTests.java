package com.easyclaim.EasyClaimBackend.Controller;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.easyclaim.EasyClaimBackend.Entity.SimilarClaim;
import com.easyclaim.EasyClaimBackend.UseCase.GetSimilarLifeClaimService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class GetSimilarLifeClaimControllerTests {

    private static GetSimilarLifeClaimController controller;

    private static GetSimilarLifeClaimService service;

    private static List<SimilarClaim> similarClaims;


    @BeforeAll
    static void setup() {
        service = mock(GetSimilarLifeClaimService.class);
        controller = new GetSimilarLifeClaimController(service);
        similarClaims = new ArrayList<>();
        for (int i = 1; i < 6; i++) {
            LifeClaim claim = new LifeClaim(Integer.toString(i));
            float score = (float) Math.random();
            SimilarClaim similarClaim = new SimilarClaim(score, claim);
            similarClaims.add(similarClaim);

        }

    }

    @Test
    void getSimilarLifeClaims_basedOnClaimNumber_claimsReturned() throws ExecutionException, InterruptedException {
        when(service.getSimilarLifeClaims("123456")).thenReturn(similarClaims);

        List<SimilarClaim> returnedClaims = controller.getSimilarLifeClaims("123456");

        Assertions.assertEquals(returnedClaims, similarClaims);
    }

    @Test
    void getSimilarLifeClaims_noSimilarClaims_emptyListReturned() throws ExecutionException, InterruptedException {
        when(service.getSimilarLifeClaims("123456")).thenReturn(new ArrayList<>());

        List<SimilarClaim> returnedClaims = controller.getSimilarLifeClaims("123456");

        Assertions.assertTrue(returnedClaims.isEmpty());
    }


}
