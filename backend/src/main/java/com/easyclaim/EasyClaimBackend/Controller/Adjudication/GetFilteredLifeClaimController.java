package com.easyclaim.EasyClaimBackend.Controller.Adjudication;


import com.easyclaim.EasyClaimBackend.UseCase.Adjudication.GetFilteredLifeClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;

import java.util.List;
import java.util.concurrent.ExecutionException;


@RestController
@RequestMapping("/api")
public class GetFilteredLifeClaimController {

    private GetFilteredLifeClaimService filteredlifeClaimService;

    @Autowired
    public GetFilteredLifeClaimController(GetFilteredLifeClaimService service) {
        this.filteredlifeClaimService = service;
    }

    @GetMapping("/get_filtered/{type}/{lastClaimIndex}")
    public List<LifeClaim> getFilteredLifeClaims(@PathVariable String type, @PathVariable int lastClaimIndex) throws InterruptedException, ExecutionException {
        return filteredlifeClaimService.getFilteredLifeClaims(type, lastClaimIndex);
    }
}
