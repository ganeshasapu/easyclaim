package com.easyclaim.EasyClaimBackend.UseCase;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

public interface GetLifeClaimsDataAccessInterface {

    List<LifeClaim> getLifeClaims(String type) throws InterruptedException, ExecutionException;

    LifeClaim findLifeClaimOfType(String type, String claimNumber) throws ExecutionException, InterruptedException;

    LifeClaim findLifeClaim(String claimNumber) throws ExecutionException, InterruptedException;
}
