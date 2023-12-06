"use client";
/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Menu, Popover } from "@headlessui/react";
import { ArrowLeftIcon, CheckCircleIcon, PaperClipIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import LoanCard from "@/app/components/Cards/LoanCard";
import InfoCard from "@/app/components/Cards/InfoCard";
import SimilarClaimCard from "@/app/components/Cards/SimilarClaimCard";
import { useEffect, useState } from "react";
import Image from "next/image";
import SimilarClaimsPanel from "@/app/components/SimilarClaimsPanel";
import CurrentClaimFooter from "@/app/components/CurrentClaimFooter";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

export default function CurrentClaimView({params}: {params: {claim_id: string}}) {
  const [claim_data, setClaimData] = useState<LifeClaim | null>(null);
  const [similar_claims, setSimilarClaims] = useState<SimilarClaim[] | null>(null);
  const router = useRouter();

  if (!params.claim_id) {
    return <div>No claim id</div>
  }

  const claim_id = params.claim_id;

  useEffect(() => {
    const getLifeClaim = async (claim_id: string) => {
      const claim_url = `/api/get_life/claim/${claim_id}`;
      const claim_data = await fetch(claim_url).then((res) => res.json());

      if (claim_data.error) {
        console.error(claim_data.error);
        return;
      }
      setClaimData(claim_data);
    };
    const getSimilarClaim = async (claim_id: string) => {
      const similar_claims_url = `/api/get_similar_life/${claim_id}`;
      const similar_claims = await fetch(similar_claims_url).then((res) => res.json());

      if (similar_claims.error) {
        console.error(similar_claims.error);
        return;
      }

      similar_claims.sort(
        (a: SimilarClaim, b: SimilarClaim) => b.similarityScore - a.similarityScore
      );

      setSimilarClaims(similar_claims);
    };
    getSimilarClaim(claim_id);
    getLifeClaim(claim_id);
  }, []);


  return (
    <>
      <div className="min-h-full bg-gray-50">
        <Popover as="header" className="bg-[#0b9541] pb-24">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative flex items-center justify-center py-5 lg:justify-between">
                  {/* Logo */}
                  <div className="absolute left-0 flex-shrink-0 lg:static flex">
                    <button
                      className="flex gap-2"
                      onClick={() => {
                        router.back();
                      }}
                    >
                      <ArrowLeftIcon className="h-6 w-6 text-white" />
                      <div className="text-white">Back</div>
                    </button>
                  </div>

                  {/* Right section on desktop */}
                  <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-4 flex-shrink-0">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                        </Menu.Button>
                      </div>
                    </Menu>
                  </div>
                </div>
                <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
                  <div className="grid grid-cols-3 items-center gap-8">
                    <div className="col-span-2">
                      <nav className="flex space-x-4"></nav>
                    </div>
                    <div>
                      <div className="mx-auto w-full max-w-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Popover>
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Page title</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-1-title">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      <div className="relative h-[75vh] w-full text-black overflow-scroll no-scrollbar">
                        <div className="sticky top-0 border-b-2 border-gray-100 bg-white px-2 py-3 sm:px-6">
                          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                            <div className="ml-4 mt-4">
                              {claim_data ? (
                                <h1 className="text-lg font-medium leading-6 text-gray-900">
                                  LifeClaim #{claim_id} | {claim_data.dateOccured}
                                </h1>
                              ) : (
                                <div className="bg-gray-200 w-[80%] animate-pulse h-[5vh] rounded-2xl"></div>
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
                                <span className="truncate font-medium">Form1.pdf</span>
                                <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href="#"
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
                                <span className="truncate font-medium">Form2.pdf</span>
                                <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href="#"
                                className="font-medium text-[#0b9541] text-[#0b9541]"
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

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-2-title">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      <div className="h-[75vh] overflow-scroll no-scrollbar">
                        <SimilarClaimsPanel similar_claims={similar_claims} inbox_claim_id={claim_id}/>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          {/* Footer */}
          {claim_data  && similar_claims ? (
            <CurrentClaimFooter urlSegment={claim_id} similarClaims={similar_claims!}/>
          ) : (
            <div className="bg-gray-200 w-full animate-pulse h-[5vh] rounded-2xl" />
          )}
        </main>
      </div>
    </>
  );
}
