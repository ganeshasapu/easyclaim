package com.easyclaim.EasyClaimBackend.Controller;

import com.easyclaim.EasyClaimBackend.Entity.*;
import com.easyclaim.EasyClaimBackend.UseCase.GetFilteredLifeClaimService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class GetFilteredLifeControllerTests {

    private static GetFilteredLifeClaimController controller;

    private static GetFilteredLifeClaimService service;

    @BeforeAll
    static void setup() {
        service = mock(GetFilteredLifeClaimService.class);
        controller = new GetFilteredLifeClaimController(service);
    }

    @Test
    void getFilteredLifeClaims_amount0to25_checkClaimsSatisfyFilter() throws Exception {
        String input = "1=true&2=false&3=false&4=false&5=false&6=false&7=false";
        EmploymentInformation info = new EmploymentInformation("Lawyer", "02-05-19",  "death");
        Loan loanA = new Loan(16039, 6634, "other", 8238);
        Loan loanB = new Loan(85686, 75324, "equity", 83893);
        Loan loanC = new Loan(79435, 64763, "car", 72706);
        GeneralLoanInformation loanInfo = new GeneralLoanInformation("Scotiabank", "ON", loanA, loanB, loanC);
        MedicalInformation medInfo = new MedicalInformation("assault", "premature", true);

        LifeClaim claim = new LifeClaim("291833", "2019-02-08", "hospital", true, false, medInfo, info, loanInfo);
        List<LifeClaim> list = new ArrayList<>(List.of(claim));
        when(service.getFilteredLifeClaims(input)).thenReturn(list);

        List<LifeClaim> returnedClaims = controller.getFilteredLifeClaims(input);

        for (LifeClaim returnedClaim: returnedClaims) {
            int amount = returnedClaim.getGeneralLoanInformation().getLoanA().getAmountOfInsuranceAppliedFor();
            Assertions.assertTrue(amount < 25000 && amount >= 0);
        }


    }

}
