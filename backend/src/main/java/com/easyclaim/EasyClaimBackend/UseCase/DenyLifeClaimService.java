package com.easyclaim.EasyClaimBackend.UseCase;

import java.util.concurrent.ExecutionException;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;

@Service
@RequiredArgsConstructor
public class DenyLifeClaimService {

    private final GetLifeClaimsDataAccessInterface getLifeDataAccessObject;

    private final DeleteLifeClaimDataAccessInterface deleteClaimDataAccessObject;

    private final UploadLifeClaimDataAccessInterface uploadDataAccessObject;
    
    public void denyClaim(String claimNumber) throws InterruptedException, ExecutionException {

        // Finding claim in database
        LifeClaim currentClaim = getLifeDataAccessObject.findLifeClaimOfType("Current", claimNumber);
        if (currentClaim == null) {
            return;
        }

        // Change status to Denied and move to claim to Historical
        currentClaim.setStatus("Denied");
        uploadDataAccessObject.uploadLife("Historical", currentClaim);
        deleteClaimDataAccessObject.deleteLifeClaim("Current", currentClaim.getClaimNumber());
    
    }

}