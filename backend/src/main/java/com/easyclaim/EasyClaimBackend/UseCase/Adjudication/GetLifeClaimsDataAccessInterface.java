package com.easyclaim.EasyClaimBackend.UseCase.Adjudication;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface GetLifeClaimsDataAccessInterface {

    List<LifeClaim> getLifeClaims(String type) throws InterruptedException, ExecutionException;

    List<LifeClaim> getLifeClaimsPaginated(String type, String lastClaimNumber) throws InterruptedException, ExecutionException;

    LifeClaim findLifeClaimOfType(String type, String claimNumber) throws ExecutionException, InterruptedException;

    LifeClaim findLifeClaim(String claimNumber) throws ExecutionException, InterruptedException;
}
