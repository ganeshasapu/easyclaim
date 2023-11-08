interface LifeClaim {
    dateOccured: Date;
    placeOfDeath: string;
    inquestHeld: boolean;
    autopsyPerformed: boolean;
    medicalInformation: MedicalInformation;
    employmentInformation: EmploymentInformation;
    generalLoanInformation: GeneralLoanInformation;
}

type MedicalInformation = {
    causeOfDeath: string;
    typeOfDeath: string;
    hospitalized: boolean;
}

type EmploymentInformation = {
    occupation: string;
    dateLastWorked: Date;
    reasonInsuredStoppedWorking: string;
}

type GeneralLoanInformation = {
    nameOfLendingInstitution: string;
    lendingInstitutionProvince: string;
    loanA: Loan;
    loanB: Loan;
    loanC: Loan;
}

type Loan = {
    originalAmountOfLoan: number;
    amountOfInsuranceAppliedFor: number;
    typeOrPurposeOfLoan: string;
    balanceOnDateOfDeath: number;
}



