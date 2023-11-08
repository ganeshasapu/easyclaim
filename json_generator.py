"""
Generate dummy data for TLI-Securian testing purposes.
--> Program will create a folder of JSON files.

Usage Info:
--> Specify the number of claims to be generated (lines 387-389).
--> Run program and open folder called "dummy_data".
"""

# Importing libraries
import os
import glob
import json
import random

def create_file(file_name, data, first, last):
	"""Create a JSON file with the given data and name."""

	# Opening file, storing data and closing file object
	file = open(file_name, "a")
	if first:
		file.write('[\n')
	json.dump(data, file, indent = 2)
	if not last:
		file.write(',\n')
	else:
		file.write('\n]\n')
	file.close()

def create_life_claims(count):
	"""Generate the specified number of life claims."""

	# Calling helper function 'count' times
	for i in range(1, count + 1):
		if count == 1:
			create_life_claim(True, True)
		elif i == count:
			create_life_claim(False, True)
		elif i == 1:
			create_life_claim(True, False)
		else:
			create_life_claim(False, False)


def create_disability_claims(count):
	"""Generate the specified number of disability claims."""

	# Calling helper function 'count' times
	for i in range(1, count + 1):
		if count == 1:
			create_disability_claim(True, True)
		elif i == count:
			create_disability_claim(False, True)
		elif i == 1:
			create_disability_claim(True, False)
		else:
			create_disability_claim(False, False)

def create_employment_claims(count):
	"""Generate the specified number of employment claims."""

	# Calling helper function 'count' times
	for i in range(1, count + 1):
		if count == 1:
			create_employment_claim(True, True)
		elif i == count:
			create_employment_claim(False, True)
		elif i == 1:
			create_employment_claim(True, False)
		else:
			create_employment_claim(False, False)

def create_life_claim(first, last):
	"""Create dummy data for the life claim JSON model, specified here:
	https://github.com/ganeshasapu/easyclaim/blob/main/life_claim.json"""

	# Initializing data template
	data = {
	  "dateOccured": "",
	  "placeOfDeath": "",
	  "inquestHeld": "",
	  "autopsyPerformed": "",
	  "medicalInformation": {
	    "causeOfDeath": "",
	    "typeOfDeath": "",
	    "hospitalized": ""
	  },
	  "employmentInformation": {
	    "occupation": "",
	    "dateLastWorked": "",
	    "reasonInsuredStoppedWorking": ""
	  },
	  "generalLoanInformation": {
	    "nameOfLendingInstitution": "",
	    "lendingInstitutionProvince": "",
	    "loanA": {
	      "originalAmountOfLoan": "",
	      "amountOfInsuranceAppliedFor": "",
	      "typeOrPurposeOfLoan": "",
	      "balanceOnDateOfDeath": ""
	    },
	    "loanB": {
	      "originalAmountOfLoan": "",
	      "amountOfInsuranceAppliedFor": "",
	      "typeOrPurposeOfLoan": "",
	      "balanceOnDateOfDeath": ""
	    },
	    "loanC": {
	      "originalAmountOfLoan": "",
	      "amountOfInsuranceAppliedFor": "",
	      "typeOrPurposeOfLoan": "",
	      "balanceOnDateOfDeath": ""
	    }
	  }
	}
	
	# Generating death information
	month = random.randint(1, 12)
	day = random.randint(4, 28)
	year = random.randint(10, 23)
	if month < 10:
		month = f"0{month}"
	if day < 10:
		day = f"0{day}"
	data["dateOccured"] = f"{month}-{day}-{year}"
	data["inquestHeld"] = bool(random.randint(0, 1))
	data["autopsyPerformed"] = bool(random.randint(0, 1))
	options = [["Home", "Old Age", "Natural", False], ["Hospital", "Heart Attack", "Natural" , True], 
		["Hospital", "Assault", "Premature", True]]
	index = random.randint(0, len(options) - 1)
	data["placeOfDeath"] = options[index][0]
	data["medicalInformation"]["causeOfDeath"] = options[index][1]
	data["medicalInformation"]["typeOfDeath"] = options[index][2]
	data["medicalInformation"]["hospitalized"] = options[index][3]

	# Generating employment information
	temp_day = int(day) - 3
	if temp_day < 10:
		temp_day = f"0{temp_day}"
	temp_date = f"{month}-{temp_day}-{year}"
	options = [["Retired", "N/A", "Death"], ["Construction", temp_date, "Death"], ["Doctor", temp_date, "Death"], 
		["Engineer", temp_date, "Death"], ["Lawyer", temp_date, "Death"], ["Teacher", temp_date, "Death"]]
	index = random.randint(0, len(options) - 1)
	data["employmentInformation"]["occupation"] = options[index][0]
	data["employmentInformation"]["dateLastWorked"] = options[index][1]
	data["employmentInformation"]["reasonInsuredStoppedWorking"] = options[index][2]

	# Generating loan information
	options = ["RBC", "Scotiabank", "TD", "BMO", "CIBC"]
	index = random.randint(0, len(options) - 1)
	data["generalLoanInformation"]["nameOfLendingInstitution"] = options[index]
	data["generalLoanInformation"]["lendingInstitutionProvince"] = "ON"
	for loan_number in "ABC":

		# Creating loan string and dummy loan values
		loan_string = "loan" + loan_number
		original_amount = random.randint(10000, 100000)
		applied_for = round(random.uniform(0.3, 0.9) * original_amount)
		balance = round(applied_for + 0.1 * original_amount)
		options = ["Mortgage", "Car", "Equity", "Other"]
		index = random.randint(0, len(options) - 1)

		# Updating data
		data["generalLoanInformation"][loan_string]["originalAmountOfLoan"] = original_amount
		data["generalLoanInformation"][loan_string]["amountOfInsuranceAppliedFor"] = applied_for
		data["generalLoanInformation"][loan_string]["typeOrPurposeOfLoan"] = options[index]
		data["generalLoanInformation"][loan_string]["balanceOnDateOfDeath"] = balance

	# Saving JSON file
	file_name = f"dummy_data/life_claims/life_claim_data.json"
	create_file(file_name, data, first, last)

def create_disability_claim(first, last):
	"""Create dummy data for the disability claim JSON model, specified here:
	https://github.com/ganeshasapu/easyclaim/blob/main/disabilityclaim.json"""

	# Initializing data template
	data = {
	  "dateOfBirth": "",
	  "nameOfLendingInstitution": "",
	  "LendingInstitionProvince": "ON",
	  "disabilityType": "",
	  "disability": {
	    "accident": {
	      "dateOccurred": "",
	      "dateFirstTreated": "",
	      "accidentCause": "",
	      "motorPoliceReport": ""
	    },
	    "illness": {
	      "dateOccurred": "",
	      "dateFirstTreated": ""
	    },
	    "pregnancy": {
	      "estimatedDeliveryDate": "",
	      "dateFirstTreated": "",
	      "pregnancyComplications": ""
	    }
	  },
	  "dateLastWorked": "",
	  "missedWorkPast": "",
	  "returnedWork": "",
	  "returnWithRestrictions": "",
	  "carePhysician": {
	    "exist": "",
	    "reasonDiagnosis": ""
	  },
	  "occupation": "",
	  "physicianStatement": {
	    "hospitalized": "",
	    "surgeryPerformed": "",
	    "surgeryType": "",
	    "wasReferred": "",
	    "treatedPastTwoYears": "",
	    "treatedByAnother": ""
	  }
	}

	# Generating DOB and lending institution
	month = random.randint(1, 12)
	day = random.randint(4, 28)
	year = random.randint(50, 85)
	if month < 10:
		month = f"0{month}"
	if day < 10:
		day = f"0{day}"
	data["dateOfBirth"] = f"{month}-{day}-{year}"
	options = ["RBC", "TD", "BMO", "CIBC", "Scotiabank"]
	index = random.randint(0, len(options) - 1)
	data["nameOfLendingInstitution"] = options[index]

	# Generating disability info
	options = ["Accident", "Illness", "Pregnancy"]
	index = random.randint(0, 2)
	data["disabilityType"] = options[index]
	month = random.randint(1, 10)
	day = random.randint(1, 21)
	year = random.randint(10, 23)
	if month < 10:
		month = f"0{month}"
	if day < 10:
		day = f"0{day}"
	temp_date = f"{month}-{day}-{year}"
	month = int(month) + 1
	day = int(month) + 5
	if month < 10:
		month = f"0{month}"
	if day < 10:
		day = f"0{day}"
	temp_date_2 = f"{month}-{day}-{year}"
	if index == 0:
		data["disability"]["accident"]["dateOccurred"] = temp_date
		data["disability"]["accident"]["dateFirstTreated"] = temp_date_2
		options = [["Car Accident", True], ["Workplace Injury", False]]
		index = random.randint(0, len(options) - 1)
		data["disability"]["accident"]["accidentCause"] = options[index][0]
		data["disability"]["accident"]["motorPoliceReport"] = options[index][1]
		data["carePhysician"]["reasonDiagnosis"] = "Injury"
		data["physicianStatement"]["surgeryType"] = "Internal Injury"
	elif index == 1:
		data["disability"]["illness"]["dateOccurred"] = temp_date
		data["disability"]["illness"]["dateFirstTreated"] = temp_date_2
		data["carePhysician"]["reasonDiagnosis"] = "Sickness"
		data["physicianStatement"]["surgeryType"] = "N/A"
	else:
		data["disability"]["pregnancy"]["dateFirstTreated"] = temp_date
		data["disability"]["pregnancy"]["estimatedDeliveryDate"] = temp_date_2
		data["disability"]["pregnancy"]["pregnancyComplications"] = bool(random.randint(0, 1))
		data["carePhysician"]["reasonDiagnosis"] = "Baby"
		data["physicianStatement"]["surgeryType"] = "Baby"
	month = int(month) + 1
	day = int(month) + 3
	if month < 10:
		month = f"0{month}"
	if day < 10:
		day = f"0{day}"
	temp_date = f"{month}-{day}-{year}"
	data["dateLastWorked"] = temp_date
	data["missedWorkPast"] = bool(random.randint(0, 1))
	data["returnedWork"] = bool(random.randint(0, 1))
	data["returnWithRestrictions"] = bool(random.randint(0, 1))

	# Generating physician and occupation info
	data["carePhysician"]["exist"] = bool(random.randint(0, 1))
	options = ["Retired", "Construction", "Doctor", "Engineer", "Lawyer", "Teacher"]
	data["occupation"] = options[random.randint(0, len(options) - 1)]
	hospitalized = bool(random.randint(0, 1))
	if hospitalized:
		data["physicianStatement"]["hospitalized"] = True
		surgery = bool(random.randint(0, 1))
		if surgery:
			data["physicianStatement"]["surgeryPerformed"] = True
		else:
			data["physicianStatement"]["surgeryPerformed"] = False
			data["physicianStatement"]["surgeryType"] = "N/A"
	else:
		data["physicianStatement"]["hospitalized"] = False
		data["physicianStatement"]["surgeryPerformed"] = False
		data["physicianStatement"]["surgeryType"] = "N/A"
	data["physicianStatement"]["wasReferred"] = bool(random.randint(0, 1))
	data["physicianStatement"]["treatedPastTwoYears"] = bool(random.randint(0, 1))
	data["physicianStatement"]["treatedByAnother"] = bool(random.randint(0, 1))

	# Saving JSON file
	file_name = f"dummy_data/disability_claims/disability_claim_data.json"
	create_file(file_name, data, first, last)

def create_employment_claim(first, last):
	"""Create dummy data for the employment claim JSON model, specified here:
	https://github.com/ganeshasapu/easyclaim/blob/main/employerclaim.json"""

	# Initializing data template
	data = {
	  "dateOfBirth": "",
	  "employerFill": {
	    "dateOfHire": "",
	    "dateLastWorked": "",
	    "reasonStop": "",
	    "receiveingBenefits": "",
	    "oldHoursPerWeek": "",
	    "returned": "",
	    "returnedDate": "",
	    "currentHoursPerWeek": "",
	    "returnState": "",
	    "restrictionsPreventWork": "",
	  },
	  "currentWorkState": {
	    "lightWorkAvailableNow": "",
	    "lightWorkAvailableFuture": "",
	    "canModifyForRestrictions": "",
	  },
	  "workersCompensation": {
	    "filedCompensationClaim": "",
	    "stillReceivingBenefits": "",
	    "compensationCarrier": "Securian"
	  },
	  "authorizedRep": {
	    "companyName": "",
	  }
	}
	month = random.randint(1, 12)
	day = random.randint(4, 28)
	year = random.randint(50, 85)
	if month < 10:
		month = f"0{month}"
	if day < 10:
		day = f"0{day}"
	data["dateOfBirth"] = f"{month}-{day}-{year}"
	options = ["Normal retirement", "Voluntary separation", "Involuntary termination", "Medical leave", 
		"Disability retirement", "Laid off"]
	index = random.randint(0, len(options) - 1)
	data["employerFill"]["reasonStop"] = options[index]
	month = random.randint(1, 10)
	day = random.randint(1, 21)
	year = random.randint(10, 20)
	if month < 10:
		month = f"0{month}"
	if day < 10:
		day = f"0{day}"
	temp_date = f"{month}-{day}-{year}"
	month = int(month) + 1
	day = int(month) + 5
	year += 3
	if month < 10:
		month = f"0{month}"
	if day < 10:
		day = f"0{day}"
	temp_date_2 = f"{month}-{day}-{year}"
	data["employerFill"]["dateOfHire"] = temp_date
	data["employerFill"]["dateLastWorked"] = temp_date_2
	data["employerFill"]["receiveingBenefits"] = bool(random.randint(0, 1))
	data["employerFill"]["oldHoursPerWeek"] = random.randint(10, 40)
	returned = bool(random.randint(0, 1))
	data["employerFill"]["returned"] = returned
	if returned:
		year += 1
		data["employerFill"]["returnedDate"] = f"{month}-{day}-{year}"
		data["employerFill"]["currentHoursPerWeek"] = random.randint(10, 40)
		options = ["Full-time, no restrictions", "Full-time, with restrictions", "Part-time, no restrictions", 
			"Part-time, with restrictions"]
		index = random.randint(0, 3)
		data["employerFill"]["returnState"] = options[index]
		if index % 2 == 1:
			data["employerFill"]["restrictionsPreventWork"] = "Some"
		else:
			data["employerFill"]["restrictionsPreventWork"] = "N/A"
	else:
		data["employerFill"]["returnedDate"] = "N/A"
		data["employerFill"]["currentHoursPerWeek"] = "N/A"
		data["employerFill"]["returnState"] = "N/A"
		data["employerFill"]["restrictionsPreventWork"] = "N/A"
	data["currentWorkState"]["lightWorkAvailableNow"] = bool(random.randint(0, 1))
	data["currentWorkState"]["lightWorkAvailableFuture"] = bool(random.randint(0, 1))
	data["currentWorkState"]["canModifyForRestrictions"] = bool(random.randint(0, 1))
	data["workersCompensation"]["filedCompensationClaim"] = bool(random.randint(0, 1))
	data["workersCompensation"]["stillReceivingBenefits"] = bool(random.randint(0, 1))
	options = ["RBC", "TD", "BMO", "CIBC", "Scotiabank"]
	index = random.randint(0, len(options) - 1)
	data["authorizedRep"]["companyName"] = options[index]

	# Saving JSON file
	file_name = f"dummy_data/employment_claims/employment_claim_data.json"
	create_file(file_name, data, first, last)


# Program runner
if __name__ == "__main__":

	# Creating data folders
	try:
		os.mkdir("dummy_data")
		os.mkdir("dummy_data/life_claims")
		os.mkdir("dummy_data/disability_claims")
		os.mkdir("dummy_data/employment_claims")
	except FileExistsError as e:
		for filename in glob.iglob("dummy_data/**/*.json", recursive=True):
			os.remove(filename)

	# Specifying counts for each claim
	life_claim_count = 21
	disability_claim_count = 14
	employment_claim_count = 20

	# Generating claims using helper functions
	create_life_claims(life_claim_count)
	create_disability_claims(disability_claim_count)
	create_employment_claims(employment_claim_count)




