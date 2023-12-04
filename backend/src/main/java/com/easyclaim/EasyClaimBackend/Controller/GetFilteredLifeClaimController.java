package com.easyclaim.EasyClaimBackend.Controller;


import com.easyclaim.EasyClaimBackend.UseCase.GetFilteredLifeClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.easyclaim.EasyClaimBackend.UseCase.GetLifeClaimService;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;


@RestController
@RequestMapping("/api")
public class GetFilteredLifeClaimController {

    @Autowired
    private GetFilteredLifeClaimService FilteredlifeClaimService;

    @GetMapping("/get_filtered/{type}")
    public List<LifeClaim> getFilteredLifeClaims(@PathVariable String type) throws InterruptedException, ExecutionException {
        return FilteredlifeClaimService.getFilteredLifeClaims(type);
    }
}
