package com.easyclaim.EasyClaimBackend.Controller;


import com.easyclaim.EasyClaimBackend.UseCase.GetSimilarLifeClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.easyclaim.EasyClaimBackend.Entity.SimilarClaim;


import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
public class GetSimilarLifeClaimController {

    private GetSimilarLifeClaimService similarLifeClaimService;

    @Autowired
    public GetSimilarLifeClaimController(GetSimilarLifeClaimService service) {
        this.similarLifeClaimService = service;
    }

    @GetMapping("/get_similar_life/{claimNumber}")
    public List<SimilarClaim> getSimilarLifeClaims(@PathVariable String claimNumber) throws InterruptedException,
            ExecutionException {
        return similarLifeClaimService.getSimilarLifeClaims(claimNumber);
    }

}
