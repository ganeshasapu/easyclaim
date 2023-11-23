interface LifeClaim {
    dateOccured: string;
    placeOfDeath: string;
    inquestHeld: boolean;
    autopsyPerformed: boolean;
    medicalInformation: MedicalInformation;
    employmentInformation: EmploymentInformation;
    status: string
    generalLoanInformation: GeneralLoanInformation;
}

type MedicalInformation = {
    causeOfDeath: string;
    typeOfDeath: string;
    hospitalized: boolean;
}

type EmploymentInformation = {
    occupation: string;
    dateLastWorked: string;
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



