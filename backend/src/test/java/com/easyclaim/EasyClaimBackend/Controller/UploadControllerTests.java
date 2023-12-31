package com.easyclaim.EasyClaimBackend.Controller;

import com.easyclaim.EasyClaimBackend.Controller.Adjudication.UploadController;
import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.easyclaim.EasyClaimBackend.UseCase.UploadService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.concurrent.ExecutionException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class UploadControllerTests {

    private static UploadController controller;

    private static UploadService service;

    private static LifeClaim claim;

    @BeforeAll
    static void setup() {
        service = mock(UploadService.class);
        controller = new UploadController(service);
        claim = new LifeClaim("123456");
    }

    @Test
    void uploadCurrentLife_uploadLifeClaim_receiveUpdateTime() throws ExecutionException, InterruptedException {
        String updateTime = String.valueOf(LocalDateTime.now());
        when(service.uploadLife(eq("Current"), any(LifeClaim.class))).thenReturn(
                updateTime);

        String result = controller.uploadCurrentLife(claim);

        Assertions.assertEquals(result, updateTime);
    }

    @Test
    void uploadHistoricalLife_uploadLifeClaim_receiveUpdateTime() throws ExecutionException, InterruptedException {
        String updateTime = String.valueOf(LocalDateTime.now());
        when(service.uploadLife(eq("Historical"), any(LifeClaim.class))).thenReturn(
                updateTime);

        String result = controller.uploadHistoricalLife(claim);

        Assertions.assertEquals(result, updateTime);
    }
}
