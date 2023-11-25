package com.easyclaim.EasyClaimBackend.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.easyclaim.EasyClaimBackend.Service.GetLifeClaimService;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;


@RestController
@RequestMapping("/api")
public class GetLifeClaimController {

  @Autowired
  private GetLifeClaimService lifeClaimService;
  
  @GetMapping("/get_life/{type}")
  public ArrayList<LifeClaim> getLifeClaims(@PathVariable String type) throws InterruptedException, ExecutionException {
    return lifeClaimService.getLifeClaims(type);
  }

  @GetMapping("/get_life/claim/{claimNumber}")
    public LifeClaim getLifeClaim(@PathVariable String claimNumber) throws InterruptedException, ExecutionException {
        return lifeClaimService.findLifeClaim(claimNumber);
    }
}
