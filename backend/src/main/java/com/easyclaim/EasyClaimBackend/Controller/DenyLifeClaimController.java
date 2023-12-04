package com.easyclaim.EasyClaimBackend.Controller;


import com.easyclaim.EasyClaimBackend.UseCase.DenyLifeClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;


@RestController
@RequestMapping("/api")
public class DenyLifeClaimController {

  private DenyLifeClaimService denyLifeClaimService;

  @Autowired
  public DenyLifeClaimController(DenyLifeClaimService service) {
    this.denyLifeClaimService = service;
  }
  
  @GetMapping("/deny_life/{claimNumber}")
  public void denyClaim(@PathVariable String claimNumber) throws InterruptedException,
  ExecutionException {
     denyLifeClaimService.denyClaim(claimNumber);
  }
}
