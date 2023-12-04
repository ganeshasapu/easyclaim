package com.easyclaim.EasyClaimBackend.Controller;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.easyclaim.EasyClaimBackend.UseCase.GetLifeClaimService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class GetLifeClaimControllerTests {

    private static GetLifeClaimController controller;

    private static GetLifeClaimService service;

    private static LifeClaim claim;

    private static List<LifeClaim> currentClaims;

    private static List<LifeClaim> historicalClaims;

    @BeforeAll
    static void setup() {
        service = mock(GetLifeClaimService.class);
        controller = new GetLifeClaimController(service);
        claim = new LifeClaim("123456");
        currentClaims = new ArrayList<>();
        historicalClaims = new ArrayList<>();
        for (int i = 1; i < 6; i++) {
            LifeClaim claim = new LifeClaim(Integer.toString(i));
            LifeClaim claim2 = new LifeClaim(Integer.toString(10 + i));
            currentClaims.add(claim);
            historicalClaims.add(claim2);
        }

    }

    @Test
    void getLifeClaim_findByNumber_CorrectClaimReturned() throws ExecutionException, InterruptedException {
        when(service.findLifeClaim("123456")).thenReturn(claim);
        LifeClaim returnedClaim = controller.getLifeClaim("123456");

        Assertions.assertEquals("123456", returnedClaim.getClaimNumber());
    }

    @Test
    void getLifeClaim_claimDoesNotExist_nullReturned() throws ExecutionException, InterruptedException {
        when(service.findLifeClaim("ABCDEF")).thenReturn(null);
        LifeClaim returnedClaim = controller.getLifeClaim("ABCDEF");

        Assertions.assertNull(returnedClaim);
    }

    @Test
    void getLifeClaims_getCurrentClaims_currentClaimsReturned() throws ExecutionException, InterruptedException {
        when(service.getLifeClaims("Current")).thenReturn(currentClaims);
        List<LifeClaim> returnedClaims = controller.getLifeClaims("Current");

        Assertions.assertEquals(returnedClaims, currentClaims);

    }

    @Test
    void getLifeClaims_getHistoricalClaims_historicalClaimsReturned() throws ExecutionException, InterruptedException {
        when(service.getLifeClaims("Historical")).thenReturn(historicalClaims);
        List<LifeClaim> returnedClaims = controller.getLifeClaims("Historical");

        Assertions.assertEquals(returnedClaims, historicalClaims);
    }


}
