package com.easyclaim.EasyClaimBackend.UseCase;


import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public final class LifeClaimUtility {

    private LifeClaimUtility() {}

    public static List<LifeClaim> getLifeClaims(GetLifeClaimsDataAccessInterface dao, String type)
            throws InterruptedException, ExecutionException {
        return dao.getLifeClaims(type);

    }

    public static LifeClaim findLifeClaimOfType(GetLifeClaimsDataAccessInterface dao, String type, String claimNumber)
            throws ExecutionException, InterruptedException {
        return dao.findLifeClaimOfType(type, claimNumber);

    }

    public static void deleteLifeClaim(DeleteLifeClaimDataAccessInterface dao, String type, String claimNumber) {
        dao.deleteLifeClaim(type, claimNumber);

    }

    public static void uploadLifeClaim(UploadLifeClaimDataAccessInterface dao, String type, LifeClaim claim) throws ExecutionException, InterruptedException {

        dao.uploadLife(type, claim);


    }






}
