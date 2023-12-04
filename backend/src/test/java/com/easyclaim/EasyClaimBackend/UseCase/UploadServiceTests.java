package com.easyclaim.EasyClaimBackend.UseCase;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.stubbing.Answer;


import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class UploadServiceTests {

    private UploadService service;

    private UploadLifeClaimDataAccessInterface uploadDataAccessObject;

    private LifeClaim claim;

    List<LifeClaim> current;

    List<LifeClaim> historical;

    @BeforeEach
    void setup() {
        uploadDataAccessObject = mock(UploadLifeClaimDataAccessInterface.class);
        service = new UploadService(uploadDataAccessObject);
        claim = new LifeClaim("123456");
        current = new ArrayList<>();
        historical = new ArrayList<>();
    }

    @Test
    void uploadLife_uploadToCurrent_uploadedSuccessfully() throws ExecutionException, InterruptedException {
        when(uploadDataAccessObject.uploadLife(eq("Current"), any(LifeClaim.class))).thenAnswer(
                (Answer<Void>) invocationOnMock -> {
                    current.add(invocationOnMock.getArgument(1));
                    return null;
                }
        );

        service.uploadLife("Current", claim);
        Assertions.assertEquals(1, current.size());
        Assertions.assertTrue(current.contains(claim));
    }

    @Test
    void uploadLife_uploadToHistorical_uploadedSuccessfully() throws ExecutionException, InterruptedException {
        when(uploadDataAccessObject.uploadLife(eq("Historical"), any(LifeClaim.class))).thenAnswer(
                (Answer<Void>) invocationOnMock -> {
                    historical.add(invocationOnMock.getArgument(1));
                    return null;
                }
        );

        service.uploadLife("Historical", claim);
        Assertions.assertEquals(1, historical.size());
        Assertions.assertTrue(historical.contains(claim));
    }

}
