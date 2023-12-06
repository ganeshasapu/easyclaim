package com.easyclaim.EasyClaimBackend.UseCase;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.ArrayList;


import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;

@Service
@RequiredArgsConstructor
public class GetLifeClaimService {

  private final GetLifeClaimsDataAccessInterface dataAccessObject;


  public List<LifeClaim> getLifeClaims(String type) throws InterruptedException, ExecutionException {
    return this.dataAccessObject.getLifeClaims(type);
  }

  public List<LifeClaim> getLifeClaimsPaginated(String type, String lastClaimNumber) throws InterruptedException, ExecutionException {
    return this.dataAccessObject.getLifeClaimsPaginated(type, lastClaimNumber);
  }

  public LifeClaim findLifeClaim(String claimNumber) throws ExecutionException, InterruptedException {
    return this.dataAccessObject.findLifeClaim(claimNumber);
  }

}
