package com.easyclaim.EasyClaimBackend.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.easyclaim.EasyClaimBackend.UseCase.GetLifeClaimService;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;


@RestController
@RequestMapping("/api")
public class GetLifeClaimController {

  private final GetLifeClaimService lifeClaimService;

  @Autowired
  public GetLifeClaimController(GetLifeClaimService service) {
    this.lifeClaimService = service;
  }
  
  @GetMapping("/get_life/{type}")
  public List<LifeClaim> getLifeClaims(@PathVariable String type) throws InterruptedException, ExecutionException {
    return lifeClaimService.getLifeClaims(type);
  }

    @GetMapping("/get_life/{type}/{lastClaimNumber}")
    public List<LifeClaim> getLifeClaimsPaginated(@PathVariable String type, @PathVariable String lastClaimNumber) throws InterruptedException, ExecutionException {
        return lifeClaimService.getLifeClaimsPaginated(type, lastClaimNumber);
    }


  @GetMapping("/get_life/claim/{claimNumber}")
    public LifeClaim getLifeClaim(@PathVariable String claimNumber) throws InterruptedException, ExecutionException {
        return lifeClaimService.findLifeClaim(claimNumber);
    }
}
