package com.easyclaim.EasyClaimBackend.UseCase;

import java.util.concurrent.ExecutionException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;

@Service
@RequiredArgsConstructor
public class ProcessLifeClaimService {

    private final GetLifeClaimsDataAccessInterface getLifeDataAccessObject;

    private final DeleteLifeClaimDataAccessInterface deleteClaimDataAccessObject;

    private final UploadLifeClaimDataAccessInterface uploadDataAccessObject;

    private void processClaim(String claimNumber, String decision) throws InterruptedException, ExecutionException {

        // Finding claim in database
        LifeClaim currentClaim = getLifeDataAccessObject.findLifeClaimOfType("Current", claimNumber);
        if (currentClaim == null) {
            System.out.println("we are returning");
            return;
        }

        // Change claim status and move to claim to Historical
        currentClaim.setStatus(decision);
        uploadDataAccessObject.uploadLife("Historical", currentClaim);
        deleteClaimDataAccessObject.deleteLifeClaim("Current", currentClaim.getClaimNumber());

    }
    
    public void denyClaim(String claimNumber) throws InterruptedException, ExecutionException {

        processClaim(claimNumber, "Denied");
    
    }

    public void approveClaim(String claimNumber) throws InterruptedException, ExecutionException {

        processClaim(claimNumber, "Approved");

    }

}