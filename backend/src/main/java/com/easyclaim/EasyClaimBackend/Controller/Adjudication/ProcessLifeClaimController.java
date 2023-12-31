package com.easyclaim.EasyClaimBackend.Controller.Adjudication;


import com.easyclaim.EasyClaimBackend.UseCase.Adjudication.ProcessLifeClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;


@RestController
@RequestMapping("/api")
public class ProcessLifeClaimController {

  private final ProcessLifeClaimService processLifeClaimService;

  @Autowired
  public ProcessLifeClaimController(ProcessLifeClaimService service) {
    this.processLifeClaimService = service;
  }
  
  @GetMapping("/deny_life/{claimNumber}")
  public void denyClaim(@PathVariable String claimNumber) throws InterruptedException,
  ExecutionException {
     processLifeClaimService.denyClaim(claimNumber);
  }

  @GetMapping("/approve_life/{claimNumber}")
  public void approveClaim(@PathVariable String claimNumber) throws InterruptedException,
          ExecutionException {
    processLifeClaimService.approveClaim(claimNumber);
  }
}
