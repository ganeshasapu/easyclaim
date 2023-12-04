package com.easyclaim.EasyClaimBackend.Entity;

public class MedicalInformation {
    private String causeOfDeath;
    private String typeOfDeath;
    private boolean hospitalized;

    public MedicalInformation(String causeOfDeath, String typeOfDeath, boolean hospitalized) {
        this.causeOfDeath = causeOfDeath;
        this.typeOfDeath = typeOfDeath;
        this.hospitalized = hospitalized;
    }

    public MedicalInformation() {}
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