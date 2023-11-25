package com.easyclaim.EasyClaimBackend.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.easyclaim.EasyClaimBackend.Entity.SimilarClaim;
import com.easyclaim.EasyClaimBackend.UseCase.GetSimilarLifeClaimService;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
public class GetSimilarLifeClaimController {

    @Autowired
    private GetSimilarLifeClaimService similarLifeClaimService;

    @GetMapping("/get_similar_life/{claimNumber}")
    public List<SimilarClaim> getSimilarLifeClaims(@PathVariable String claimNumber) throws InterruptedException,
            ExecutionException {
        return similarLifeClaimService.getSimilarLifeClaims(claimNumber);
    }

}
