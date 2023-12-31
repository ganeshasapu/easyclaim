package com.easyclaim.EasyClaimBackend.UseCase.Adjudication;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface GetFilteredLifeClaimsDataAccessInterface {
    List<LifeClaim> getFilteredLifeClaims(String type, int lastClaimIndex) throws InterruptedException, ExecutionException;

}
