package com.easyclaim.EasyClaimBackend.UseCase;

import com.easyclaim.EasyClaimBackend.Entity.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class BasicCompareClaimServiceTests {

    private BasicCompareClaimService comparisonAlgorithm;
    private LifeClaim claim1;

    private LifeClaim claim2;

    private LifeClaim claim3;

    @BeforeEach
    void setup() {
        comparisonAlgorithm = new BasicCompareClaimService();
        claim1 = new LifeClaim("100001", "01-15-22", "City Hospital",
                true, false,
                new MedicalInformation("Natural Causes", "Natural", true),
                new EmploymentInformation("Software Engineer", "12-31-22",
                        "Retirement"),
                new GeneralLoanInformation("ABC Bank", "California",
                        new Loan(100000, 80000,
                                "Home Loan", 50000),
                        new Loan(5000, 4000, "Auto Loan",
                                2000),
                        new Loan(20000, 15000,
                                "Education Loan", 10000))
        );

        claim2 = new LifeClaim("100002", "02-20-22", "City Hospital",
                false, true,
                new MedicalInformation("Accident", "Accidental", true),
                new EmploymentInformation("Software Engineer", "12-31-21",
                        "Retirement"),  // Similar to lifeClaim1
                new GeneralLoanInformation("ABC Bank", "California",
                        new Loan(120000, 100000,
                                "Home Loan", 75000),
                        new Loan(6000, 5000, "Auto Loan",
                                3000),
                        new Loan(25000, 20000,
                                "Education Loan", 15000))
        );

        claim3 = new LifeClaim("100003", "03-25-22", "County Hospital",
                true, true,
                new MedicalInformation("Stroke", "Natural", false),
                new EmploymentInformation("Teacher", "01-15-22",
                        "Resigned"),
                new GeneralLoanInformation("EFG Bank", "New York",
                        new Loan(80000, 60000, "Home Loan",
                                40000),
                        new Loan(4000, 3000, "Auto Loan",
                                1000),
                        new Loan(15000, 12000,
                                "Education Loan", 8000))
        );
    }

    @Test
    void getComparisonScore_testScoreCalculation_claim3NotSimilar() {
        int claim1Claim2Score = comparisonAlgorithm.getComparisonScore(claim1, claim2);
        int claim1Claim3Score = comparisonAlgorithm.getComparisonScore(claim1, claim3);
        Assertions.assertTrue(claim1Claim2Score > claim1Claim3Score);
    }

    @Test
    void getComparisonScore_testPairsOfClaims_checkForEqualScores() {
        LifeClaim claim1Duplicate = claim1;
        LifeClaim claim3Duplicate = claim3;
        int score1 = comparisonAlgorithm.getComparisonScore(claim1, claim1Duplicate);
        int score2 = comparisonAlgorithm.getComparisonScore(claim3, claim3Duplicate);
        Assertions.assertEquals(score1, score2);
    }
}
