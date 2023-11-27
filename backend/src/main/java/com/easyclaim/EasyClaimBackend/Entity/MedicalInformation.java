package com.easyclaim.EasyClaimBackend.Entity;

public class MedicalInformation {
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