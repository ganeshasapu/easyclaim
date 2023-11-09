package com.easyclaim.EasyClaimBackend.Entity;

public class GeneralLoanInformation {
    private String nameOfLendingInstitution;
    private String lendingInstitutionProvince;
    private Loan loanA;
    private Loan loanB;
    private Loan loanC;
    // getters and setters
    public String getNameOfLendingInstitution() {
        return nameOfLendingInstitution;
    }
    public void setNameOfLendingInstitution(String nameOfLendingInstitution) {
        this.nameOfLendingInstitution = nameOfLendingInstitution;
    }
    public String getLendingInstitutionProvince() {
        return lendingInstitutionProvince;
    }
    public void setLendingInstitutionProvince(String lendingInstitutionProvince) {
        this.lendingInstitutionProvince = lendingInstitutionProvince;
    }
    public Loan getLoanA() {
        return loanA;
    }
    public void setLoanA(Loan loanA) {
        this.loanA = loanA;
    }
    public Loan getLoanB() {
        return loanB;
    }
    public void setLoanB(Loan loanB) {
        this.loanB = loanB;
    }
    public Loan getLoanC() {
        return loanC;
    }
    public void setLoanC(Loan loanC) {
        this.loanC = loanC;
    }
}
