package com.easyclaim.EasyClaimBackend.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.easyclaim.EasyClaimBackend.Entity.SimilarClaim;
import com.easyclaim.EasyClaimBackend.Service.GetSimilarLifeClaimService;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
public class GetSimilarLifeClaimController {

    @Autowired
    private GetSimilarLifeClaimService similarLifeClaimService;

    @GetMapping("/get_similar_life/{claimNumber}")
    public ArrayList<SimilarClaim> getLifeClaims(@PathVariable String claimNumber) throws InterruptedException,
            ExecutionException {
        return similarLifeClaimService.getSimilarLifeClaims(claimNumber);
    }

}
