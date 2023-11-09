package com.easyclaim.EasyClaimBackend.Entity;


public class LifeClaim {
    private String claimNumber;
    private String dateOccured;
    private String placeOfDeath;
    private boolean inquestHeld;
    private boolean autopsyPerformed;
    private MedicalInformation medicalInformation;
    private EmploymentInformation employmentInformation;
    private GeneralLoanInformation generalLoanInformation;
    // getters and setters
    public String getClaimNumber() {
        return this.claimNumber;
    }
    public void setClaimNumber(String claimNumber) {
        this.claimNumber = claimNumber;
    }
    public String getDateOccured() {
        return dateOccured;
    }
    public void setDateOccured(String dateOccured) {
        this.dateOccured = dateOccured;
    }
    public String getPlaceOfDeath() {
        return placeOfDeath;
    }
    public void setPlaceOfDeath(String placeOfDeath) {
        this.placeOfDeath = placeOfDeath;
    }
    public boolean isInquestHeld() {
        return inquestHeld;
    }
    public void setInquestHeld(boolean inquestHeld) {
        this.inquestHeld = inquestHeld;
    }
    public boolean isAutopsyPerformed() {
        return autopsyPerformed;
    }
    public void setAutopsyPerformed(boolean autopsyPerformed) {
        this.autopsyPerformed = autopsyPerformed;
    }
    public MedicalInformation getMedicalInformation() {
        return medicalInformation;
    }
    public void setMedicalInformation(MedicalInformation medicalInformation) {
        this.medicalInformation = medicalInformation;
    }
    public EmploymentInformation getEmploymentInformation() {
        return employmentInformation;
    }
    public void setEmploymentInformation(EmploymentInformation employmentInformation) {
        this.employmentInformation = employmentInformation;
    }
    public GeneralLoanInformation getGeneralLoanInformation() {
        return generalLoanInformation;
    }
    public void setGeneralLoanInformation(GeneralLoanInformation generalLoanInformation) {
        this.generalLoanInformation = generalLoanInformation;
    }
}
class MedicalInformation {
    private String causeOfDeath;
    private String typeOfDeath;
    private boolean hospitalized;
    // getters and setters
    public String getCauseOfDeath() {
        return causeOfDeath;
    }
    public void setCauseOfDeath(String causeOfDeath) {
        this.causeOfDeath = causeOfDeath;
    }
    public String getTypeOfDeath() {
        return typeOfDeath;
    }
    public void setTypeOfDeath(String typeOfDeath) {
        this.typeOfDeath = typeOfDeath;
    }
    public boolean isHospitalized() {
        return hospitalized;
    }
    public void setHospitalized(boolean hospitalized) {
        this.hospitalized = hospitalized;
    }
}
class EmploymentInformation {
    private String occupation;
    private String dateLastWorked;
    private String reasonInsuredStoppedWorking;
    // getters and setters
    public String getOccupation() {
        return occupation;
    }
    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }
    public String getDateLastWorked() {
        return dateLastWorked;
    }
    public void setDateLastWorked(String dateLastWorked) {
        this.dateLastWorked = dateLastWorked;
    }
    public String getReasonInsuredStoppedWorking() {
        return reasonInsuredStoppedWorking;
    }
    public void setReasonInsuredStoppedWorking(String reasonInsuredStoppedWorking) {
        this.reasonInsuredStoppedWorking = reasonInsuredStoppedWorking;
    }
}
class GeneralLoanInformation {
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
class Loan {
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
