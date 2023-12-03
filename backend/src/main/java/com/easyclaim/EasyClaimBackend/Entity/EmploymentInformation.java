package com.easyclaim.EasyClaimBackend.Entity;

public class EmploymentInformation {
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