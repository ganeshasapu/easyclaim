package com.easyclaim.EasyClaimBackend.UseCase;


import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


public class GetLifeClaimServiceTests {

    private GetLifeClaimsDataAccessInterface dataAccessObject;

    private GetLifeClaimService service;

    private ArrayList<LifeClaim> claims;

    @BeforeEach
    void setup() {
        dataAccessObject = mock(GetLifeClaimsDataAccessInterface.class);
        service = new GetLifeClaimService(dataAccessObject);
        claims = new ArrayList<>();
        for (int i = 1; i < 11; i++) {
            LifeClaim claim = new LifeClaim();
            claim.setClaimNumber(Integer.toString(i));
            claims.add(claim);
        }
    }

    @Test
    void findLifeClaim_getClaimByNumber_numbersMatch() throws ExecutionException, InterruptedException {
        String claimNumber = "123456";
        LifeClaim claim = new LifeClaim();
        claim.setClaimNumber(claimNumber);
        when(dataAccessObject.findLifeClaim(claimNumber)).thenReturn(claim);

        LifeClaim claimTwo = service.findLifeClaim(claimNumber);

        Assertions.assertEquals(claimNumber, claimTwo.getClaimNumber());
    }

    @Test
    void getLifeClaims_getCurrentClaimsByType_currentClaimsReturned() throws ExecutionException, InterruptedException {
        when(dataAccessObject.getLifeClaims("Current")).thenReturn(claims.subList(0, 5));

        List<LifeClaim> returnedClaims = service.getLifeClaims("Current");

        for (int i = 0; i < 5; i++) {
            Assertions.assertTrue(returnedClaims.get(i) == claims.get(i));
        }

    }

    @Test
    void getLifeClaims_getHistoricalClaimsByType_historicalClaimsReturned() throws ExecutionException, InterruptedException {
        when(dataAccessObject.getLifeClaims("Historical")).thenReturn(claims.subList(5, 10));

        List<LifeClaim> returnedClaims = service.getLifeClaims("Historical");

        for (int i = 0; i < 5; i++) {
            Assertions.assertTrue(returnedClaims.get(i) == claims.get(i + 5));
        }


    }

}
