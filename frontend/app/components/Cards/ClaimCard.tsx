import InfoCard from "@/app/components/Cards/InfoCard";
import LoanCard from "@/app/components/Cards/LoanCard";
import {PaperClipIcon} from "@heroicons/react/20/solid";
<<<<<<< HEAD
import HistoricalClaimFooter from "@/app/components/HistoricalClaimFooter";P
=======
import HistoricalClaimFooter from "@/app/components/HistoricalClaimFooter";
import { useContext } from "react";
import { highlightContext } from "@/utils";
>>>>>>> 90fbcbf9cd6f9d3fe7d66277ed6281e1fcec821f


const ClaimCard = ({claim_data, prefixString, width, isHistorical} : {claim_data: LifeClaim | null,
    prefixString: string, width: string, isHistorical: boolean}) => {
  return (
      <div className={`grid grid-cols-1 gap-4 lg:col-span-${width}`}>
          <section aria-labelledby="section-1-title">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                      <div className="relative h-[75vh] w-full text-black overflow-scroll no-scrollbar">
                          <div className="sticky top-0 border-b-2 border-gray-100 bg-white px-2 py-3 sm:px-6">
                              <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                                  <div className="ml-4 mt-4">
                                      {claim_data ? (
                                          <h1 className="text-lg font-medium leading-6 text-gray-900">
                                              {prefixString} Claim #{claim_data.claimNumber} | {claim_data.dateOccured}
                                          </h1>
                                      ) : (
                                          <div className="bg-gray-200 w-[80%] animate-pulse h-[5vh] rounded-2xl"></div>
                                      )}
                                      {isHistorical ? (
                                          <><br/><HistoricalClaimFooter/></>
                                      ) : (
                                          <></>
                                      )}
                                  </div>
                              </div>
                          </div>
                          {/* General info card */}
                          {claim_data ? (
                              <InfoCard
                                  title="General Information"
                                  fields={["Inquest Held", "Place of Death", "Autopsy Performed"]}
                                  values={[
                                      claim_data.inquestHeld ? "True" : "False",
                                      claim_data.placeOfDeath,
                                      claim_data.autopsyPerformed ? "True" : "False",
                                  ]}
                              />
                          ) : (
                              <div className="bg-gray-200 w-full animate-pulse h-[20vh] my-4 rounded-2xl" />
                          )}

                          {/* Employment Info card */}
                          {claim_data ? (
                              <InfoCard
                                  title="Employment Information"
                                  fields={["Date Last Worked", "Occupation", "Reason Stopped Working"]}
                                  values={[
                                      claim_data.employmentInformation.dateLastWorked,
                                      claim_data.employmentInformation.occupation,
                                      claim_data.employmentInformation.reasonInsuredStoppedWorking,
                                  ]}
                              />
                          ) : (
                              <div className="bg-gray-200 w-full animate-pulse h-[20vh] my-4 rounded-2xl" />
                          )}

                          {/* Medical Information Card */}
                          {claim_data ? (
                              <InfoCard
                                  title="Medical Information"
                                  fields={["Cause of Death", "Hospitalized", "Type of Death"]}
                                  values={[
                                      claim_data.medicalInformation.causeOfDeath,
                                      claim_data.medicalInformation.hospitalized ? "True" : "False",
                                      claim_data.medicalInformation.typeOfDeath,
                                  ]}
                              />
                          ) : (
                              <div className="bg-gray-200 w-full animate-pulse h-[20vh] my-4 rounded-2xl" />
                          )}

                          {/* Loan Information Card */}
                          {claim_data ? (
                              <InfoCard
                                  title="Loan Information"
                                  fields={["Lending Institute Name", "Lending Institute Province"]}
                                  values={[
                                      claim_data.generalLoanInformation.nameOfLendingInstitution,
                                      claim_data.generalLoanInformation.lendingInstitutionProvince,
                                  ]}
                              />
                          ) : (
                              <div className="bg-gray-200 w-full animate-pulse h-[20vh] my-4 rounded-2xl" />
                          )}

                          {/* Loan A card */}

                          <div className="flex w-full justify-around gap-4">
                              {claim_data ? (
                                  <LoanCard
                                      title="Loan A"
                                      type={claim_data.generalLoanInformation.loanA.typeOrPurposeOfLoan}
                                      amount={claim_data.generalLoanInformation.loanA.originalAmountOfLoan}
                                      balance={claim_data.generalLoanInformation.loanA.balanceOnDateOfDeath}
                                      appliedFor={
                                          claim_data.generalLoanInformation.loanA.amountOfInsuranceAppliedFor
                                      }
                                  />
                              ) : (
                                  <div className="bg-gray-200 w-full animate-pulse h-[20vh] rounded-2xl" />
                              )}

                              {/* Loan B Card*/}
                              {claim_data ? (
                                  <LoanCard
                                      title="Loan B"
                                      type={claim_data.generalLoanInformation.loanB.typeOrPurposeOfLoan}
                                      amount={claim_data.generalLoanInformation.loanB.originalAmountOfLoan}
                                      balance={claim_data.generalLoanInformation.loanB.balanceOnDateOfDeath}
                                      appliedFor={
                                          claim_data.generalLoanInformation.loanB.amountOfInsuranceAppliedFor
                                      }
                                  />
                              ) : (
                                  <div className="bg-gray-200 w-full animate-pulse h-[20vh] rounded-2xl" />
                              )}

                              {/* Loan C Card */}
                              {claim_data ? (
                                  <LoanCard
                                      title="Loan C"
                                      type={claim_data.generalLoanInformation.loanC.typeOrPurposeOfLoan}
                                      amount={claim_data.generalLoanInformation.loanC.originalAmountOfLoan}
                                      balance={claim_data.generalLoanInformation.loanC.balanceOnDateOfDeath}
                                      appliedFor={
                                          claim_data.generalLoanInformation.loanC.amountOfInsuranceAppliedFor
                                      }
                                  />
                              ) : (
                                  <div className="bg-gray-200 w-full animate-pulse h-[20vh] rounded-2xl" />
                              )}
                          </div>
                          {/* Forms */}
                          <ul
                              role="list"
                              className="divide-y divide-gray-100 rounded-md border border-gray-200"
                          >
                              <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                  <div className="flex w-0 flex-1 items-center">
                                      <PaperClipIcon
                                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                                          aria-hidden="true"
                                      />
                                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                          <span className="truncate font-medium">Certification of Death.pdf</span>
                                          <span className="flex-shrink-0 text-gray-400">48 KB</span>
                                      </div>
                                  </div>
                                  <div className="ml-4 flex-shrink-0">
                                      <a
                                          href="/COD.pdf" target="_blank"
                                          className="font-medium text-[#0b9541] text-[#0b9541]"
                                      >
                                          Download
                                      </a>
                                  </div>
                              </li>
                              <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                  <div className="flex w-0 flex-1 items-center">
                                      <PaperClipIcon
                                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                                          aria-hidden="true"
                                      />
                                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                          <span className="truncate font-medium">Life Claim Information Request.pdf</span>
                                          <span className="flex-shrink-0 text-gray-400">35 KB</span>
                                      </div>
                                  </div>
                                  <div className="ml-4 flex-shrink-0">
                                      <a
                                          href="/InfoReq.pdf" target="_blank"
                                          className="font-medium text-[#0b9541] hover:text-[#0b9541]"
                                      >
                                          Download
                                      </a>
                                  </div>
                              </li>
                              <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                  <div className="flex w-0 flex-1 items-center">
                                      <PaperClipIcon
                                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                                          aria-hidden="true"
                                      />
                                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                          <span className="truncate font-medium">Life Claim Initiation.pdf</span>
                                          <span className="flex-shrink-0 text-gray-400">25 KB</span>
                                      </div>
                                  </div>
                                  <div className="ml-4 flex-shrink-0">
                                      <a
                                          href="/Initiation.pdf" target="_blank"
                                          className="font-medium text-[#0b9541] hover:text-[#0b9541]"
                                      >
                                          Download
                                      </a>
                                  </div>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  );
};

export default ClaimCard;
