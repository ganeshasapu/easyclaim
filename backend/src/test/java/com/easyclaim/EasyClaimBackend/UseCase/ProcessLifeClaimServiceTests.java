package com.easyclaim.EasyClaimBackend.UseCase;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.stubbing.Answer;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static org.mockito.Mockito.*;

public class ProcessLifeClaimServiceTests {

    private ProcessLifeClaimService service;
    private UploadLifeClaimDataAccessInterface uploadDataAccessObject;

    private GetLifeClaimsDataAccessInterface getLifeDataAccessObject;

    private DeleteLifeClaimDataAccessInterface deleteLifeDataAccessObject;

    private LifeClaim claim;

    private List<LifeClaim> current;

    private List<LifeClaim> historical;
    
    private final String claimNumber = "123456";

    @BeforeEach
    void setup() {
        uploadDataAccessObject = mock(UploadLifeClaimDataAccessInterface.class);
        getLifeDataAccessObject = mock(GetLifeClaimsDataAccessInterface.class);
        deleteLifeDataAccessObject = mock(DeleteLifeClaimDataAccessInterface.class);
        service = new ProcessLifeClaimService(getLifeDataAccessObject, deleteLifeDataAccessObject, uploadDataAccessObject);
        claim = new LifeClaim(claimNumber);
        current = new ArrayList<>(List.of(claim));
        historical = new ArrayList<>();
    }

    void processClaimTestSetup(boolean claimExists) throws ExecutionException, InterruptedException {
        when(getLifeDataAccessObject.findLifeClaimOfType("Current", claimNumber))
                .thenReturn(claimExists ? current.get(0) : null);

        when(uploadDataAccessObject.uploadLife("Historical", current.get(0))).thenAnswer(
                (Answer<Void>) invocationOnMock -> {
                    historical.add(current.get(0));
                    return null;
                }

        );

        when(deleteLifeDataAccessObject.deleteLifeClaim("Current", claimNumber))
                .thenAnswer(
                        (Answer<Void>) invocationOnMock -> {
                            current.removeIf(claim -> claim.getClaimNumber() == invocationOnMock.getArgument(1));
                            return null;}
                );

    }

    @Test
    void denyClaim_claimExists_checkSetToDenied() throws ExecutionException, InterruptedException {

        processClaimTestSetup(true);

        service.denyClaim(claimNumber);
        Assertions.assertEquals(0, current.size());
        Assertions.assertEquals(1, historical.size());
        Assertions.assertEquals(claim.getStatus(), "Denied");

    }

    @Test
    void denyClaim_claimDoesNotExist_checkNullReturned() throws ExecutionException, InterruptedException {

        processClaimTestSetup(false);


        service.denyClaim(claimNumber);

        Assertions.assertEquals(0, historical.size());
        Assertions.assertEquals(1, current.size());
        Assertions.assertEquals(claim.getStatus(), "Recieved");
    }

    @Test
    void acceptClaim_claimExists_checkSetToAccepted() throws ExecutionException, InterruptedException {

        processClaimTestSetup(true);

        service.approveClaim(claimNumber);

        Assertions.assertEquals(1, historical.size());
        Assertions.assertEquals(0, current.size());
        Assertions.assertEquals(claim.getStatus(), "Approved");
    }

    @Test
    void acceptClaim_claimDoesNotExist_checkNullReturned() throws ExecutionException, InterruptedException {

        processClaimTestSetup(false);

        service.approveClaim(claimNumber);

        Assertions.assertEquals(0, historical.size());
        Assertions.assertEquals(1, current.size());
        Assertions.assertEquals(claim.getStatus(), "Recieved");
    }
}
