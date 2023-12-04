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
    private String status = "Recieved";

    public LifeClaim(String claimNumber) {
        this.claimNumber = claimNumber;
    }

    public LifeClaim(String claimNumber, String dateOccurred, String placeOfDeath, boolean inquestHeld,
                     boolean autopsyPerformed, MedicalInformation medicalInformation,
                     EmploymentInformation employmentInformation, GeneralLoanInformation generalLoanInformation) {
        this.claimNumber = claimNumber;
        this.dateOccured = dateOccurred;
        this.placeOfDeath = placeOfDeath;
        this.inquestHeld = inquestHeld;
        this.autopsyPerformed = autopsyPerformed;
        this.medicalInformation = medicalInformation;
        this.employmentInformation = employmentInformation;
        this.generalLoanInformation = generalLoanInformation;
    }

    public LifeClaim() {}
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
    public String getStatus() {
        return this.status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
}