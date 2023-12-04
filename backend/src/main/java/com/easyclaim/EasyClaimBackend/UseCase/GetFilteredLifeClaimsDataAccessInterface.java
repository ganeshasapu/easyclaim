package com.easyclaim.EasyClaimBackend.UseCase;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface GetFilteredLifeClaimsDataAccessInterface {
    List<LifeClaim> getFilteredLifeClaims(String type) throws InterruptedException, ExecutionException;

}
