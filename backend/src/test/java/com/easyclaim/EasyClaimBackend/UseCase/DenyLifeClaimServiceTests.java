package com.easyclaim.EasyClaimBackend.UseCase;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.stubbing.Answer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static org.mockito.Mockito.*;

public class DenyLifeClaimServiceTests {

    private DenyLifeClaimService service;
    private UploadLifeClaimDataAccessInterface uploadDataAccessObject;

    private GetLifeClaimsDataAccessInterface getLifeDataAccessObject;

    private DeleteLifeClaimDataAccessInterface deleteLifeDataAccessObject;

    private LifeClaim claim;

    private List<LifeClaim> current;

    private List<LifeClaim> historical;

    @BeforeEach
    void setup() {
        uploadDataAccessObject = mock(UploadLifeClaimDataAccessInterface.class);
        getLifeDataAccessObject = mock(GetLifeClaimsDataAccessInterface.class);
        deleteLifeDataAccessObject = mock(DeleteLifeClaimDataAccessInterface.class);
        service = new DenyLifeClaimService(getLifeDataAccessObject, deleteLifeDataAccessObject, uploadDataAccessObject);
        claim = new LifeClaim("123456");
        current = new ArrayList<>(List.of(claim));
        historical = new ArrayList<>();
    }

    @Test
    void denyClaim_setToDenied_movedToHistorical() throws ExecutionException, InterruptedException {
        when(getLifeDataAccessObject.findLifeClaimOfType("Current", "123456"))
                .thenReturn(current.get(0));

        when(uploadDataAccessObject.uploadLife("Historical", current.get(0))).thenAnswer(
                (Answer<Void>) invocationOnMock -> {
                    historical.add(current.get(0));
                    return null;
                }

        );

        when(deleteLifeDataAccessObject.deleteLifeClaim("Current", "123456"))
                .thenAnswer(
                        (Answer<Void>) invocationOnMock -> {
                            current.removeIf(claim -> claim.getClaimNumber() == invocationOnMock.getArgument(1));
                            return null;}
        );


        service.denyClaim("123456");
        Assertions.assertEquals(0, current.size());
        Assertions.assertEquals(1, historical.size());
        Assertions.assertEquals(claim.getStatus(), "Denied");

    }

    @Test
    void denyClaim_claimDoesNotExist_nullReturned() throws ExecutionException, InterruptedException {
        when(getLifeDataAccessObject.findLifeClaimOfType( eq("Current"), any(String.class)))
                .thenReturn(null);


        when(uploadDataAccessObject.uploadLife("Historical", current.get(0))).thenAnswer(
                (Answer<Void>) invocationOnMock -> {
                    historical.add(current.get(0));
                    return null;
                }

        );

        when(deleteLifeDataAccessObject.deleteLifeClaim("Current", "123456"))
                .thenAnswer(
                        (Answer<Void>) invocationOnMock -> {
                            current.removeIf(claim -> claim.getClaimNumber() == invocationOnMock.getArgument(1));
                            return null;}
                );


        service.denyClaim("123456");

        Assertions.assertEquals(0, historical.size());
        Assertions.assertEquals(1, current.size());
        Assertions.assertEquals(claim.getStatus(), "Recieved");
    }
}
