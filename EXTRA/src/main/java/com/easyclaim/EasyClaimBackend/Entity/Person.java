package com.easyclaim.EasyClaimBackend.Entity;

public class Person {

    private int age;
    private String name;
    private String documentName;

    public int getAge() {
        return this.age;
    }

    public String getName() {
        return this.name;
    }
    public String getDocumentName() { return this.documentName; }

    public void setAge(int newAge) {
        this.age = newAge;
    }

    public void setName(String newName) {
        this.name = newName;
    }

    public void setDocumentName(String newName) {
        this.documentName = newName;
    }

}