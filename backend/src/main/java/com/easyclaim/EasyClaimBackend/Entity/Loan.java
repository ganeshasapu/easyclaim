package com.easyclaim.EasyClaimBackend.Entity;

public class Loan {
    private int originalAmountOfLoan;
    private int amountOfInsuranceAppliedFor;
    private String typeOrPurposeOfLoan;
    private int balanceOnDateOfDeath;
    // getters and setters
    public int getOriginalAmountOfLoan() {
        return originalAmountOfLoan;
    }
    public void setOriginalAmountOfLoan(int originalAmountOfLoan) {
        this.originalAmountOfLoan = originalAmountOfLoan;
    }
    public int getAmountOfInsuranceAppliedFor() {
        return amountOfInsuranceAppliedFor;
    }
    public void setAmountOfInsuranceAppliedFor(int amountOfInsuranceAppliedFor) {
        this.amountOfInsuranceAppliedFor = amountOfInsuranceAppliedFor;
    }
    public String getTypeOrPurposeOfLoan() {
        return typeOrPurposeOfLoan;
    }
    public void setTypeOrPurposeOfLoan(String typeOrPurposeOfLoan) {
        this.typeOrPurposeOfLoan = typeOrPurposeOfLoan;
    }
    public int getBalanceOnDateOfDeath() {
        return balanceOnDateOfDeath;
    }
    public void setBalanceOnDateOfDeath(int balanceOnDateOfDeath) {
        this.balanceOnDateOfDeath = balanceOnDateOfDeath;
    }
}
