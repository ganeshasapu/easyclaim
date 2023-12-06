package com.easyclaim.EasyClaimBackend.UseCase;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.ArrayList;


import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;

@Service
@RequiredArgsConstructor
public class GetFilteredLifeClaimService {

    private final GetFilteredLifeClaimsDataAccessInterface dataAccessObject;

    public List<LifeClaim> getFilteredLifeClaims(String type, int lastClaimIndex) throws InterruptedException, ExecutionException {
        return this.dataAccessObject.getFilteredLifeClaims(type, lastClaimIndex);

    }
}
