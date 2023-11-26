package com.easyclaim.EasyClaimBackend.UseCase;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;

@Service
public class DenyLifeClaimService {

    @Autowired
    private GetLifeClaimsDataAccessInterface dataAccessObject;

    @Autowired
    private DeleteLifeClaimDataAccessInterface deleteClaimDataAccessObject;

    private final UploadService UPLOAD_SERVICE = new UploadService();
    
    public void denyClaim(String claimNumber) throws InterruptedException, ExecutionException {

        // Finding claim in database
        LifeClaim currentClaim = LifeClaimUtility.findLifeClaimOfType(dataAccessObject,"Current", claimNumber);
        if (currentClaim == null) {
            return;
        }

        // Change status to Denied and move to claim to Historical
        currentClaim.setStatus("Denied");
        UPLOAD_SERVICE.uploadHistoricalLife(currentClaim);
        LifeClaimUtility.deleteLifeClaim(deleteClaimDataAccessObject, "Current", currentClaim.getClaimNumber());
    
    }

}