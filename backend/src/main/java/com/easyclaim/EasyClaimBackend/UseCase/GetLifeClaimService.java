package com.easyclaim.EasyClaimBackend.UseCase;

import java.util.concurrent.ExecutionException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;

@Service
public class GetLifeClaimService {

  @Autowired
  private GetLifeClaimsDataAccessInterface dataAccessObject;


  public ArrayList<LifeClaim> getLifeClaims(String type) throws InterruptedException, ExecutionException {
    return this.dataAccessObject.getLifeClaims(type);

  }
  
}
