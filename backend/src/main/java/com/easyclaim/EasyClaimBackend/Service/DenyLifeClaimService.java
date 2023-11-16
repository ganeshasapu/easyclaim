package com.easyclaim.EasyClaimBackend.Service;

import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;

@Service
public class DenyLifeClaimService {

    private final UploadService UPLOAD_SERVICE = new UploadService();
    private final DeleteLifeClaimService DELETE_SERVICE = new DeleteLifeClaimService();
    private final GetSingleLifeClaimService SINGLE_LIFE_CLAIM_SERVICE = new GetSingleLifeClaimService();
    
    public void denyClaim(String claimNumber) throws InterruptedException, ExecutionException {

        // Finding claim in database
        LifeClaim currentClaim = this.SINGLE_LIFE_CLAIM_SERVICE.findLifeClaim("Current", claimNumber);
        if (currentClaim == null) {
            return;
        }

        // Change status to Denied and move to claim to Historical
        currentClaim.setStatus("Denied");
        UPLOAD_SERVICE.uploadHistoricalLife(currentClaim);
        DELETE_SERVICE.deleteLifeClaim("Current", currentClaim.getClaimNumber());
    
    }

}