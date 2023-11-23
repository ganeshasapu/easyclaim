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
import { ArrowLeftIcon, PaperClipIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CurrentClaimView({ lifeclaim, claim_id }: { lifeclaim: LifeClaim, claim_id: string }) {
  const router = useRouter()

  return (
    <>
      <div className="min-h-full bg-gray-50">
        <Popover as="header" className="bg-[#0b9541] pb-24">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative flex items-center justify-center py-5 lg:justify-between">
                  {/* Logo */}
                  <div className="absolute left-0 flex-shrink-0 lg:static">
                    <button
                      className="flex gap-2"
                      onClick={() => {
                        router.back();
                      }}
                    >
                      <ArrowLeftIcon className="h-6 w-6" />
                      <div>Back</div>
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
                      <div className="relative h-[75vh] text-black overflow-scroll no-scrollbar">
                        <div className="sticky top-0 border-b-2 border-gray-100 bg-white px-2 py-3 sm:px-6">
                          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                            <div className="ml-4 mt-4">
                              <h1 className="text-lg font-medium leading-6 text-gray-900">
                                LifeClaim #{claim_id} | {lifeclaim.dateOccured}
                              </h1>
                            </div>
                          </div>
                        </div>
                        {/* General info card */}
                        <div className="border border-gray-150 rounded-lg">
                          <div className="px-6 py-2">
                            <h1 className="py-2 font-semibold text-base">General Info</h1>
                          </div>
                          <div className="px-6 pb-4 divide-y divide-gray-200">
                            <div className="flex justify-between py-2">
                              <p>Inquest Held:</p>
                              <p>{lifeclaim.inquestHeld ? "True" : "False"}</p>
                            </div>
                            <div className="flex justify-between py-2">
                              <p>Place of Death: </p>
                              <p>{lifeclaim.placeOfDeath}</p>
                            </div>
                            <div className="flex justify-between py-2">
                              <p>Autopsy Performed: </p>
                              <p>{lifeclaim.autopsyPerformed ? "True" : "False"}</p>
                            </div>
                          </div>
                        </div>
                        {/* Employment Info card */}
                        <div className="border border-gray-150 rounded-lg my-2">
                          <div className="px-6 py-2">
                            <h1 className="py-2 font-semibold text-base">Employment Information</h1>
                          </div>
                          <div className="px-6 pb-4 divide-y divide-gray-200">
                            <div className="flex justify-between py-2">
                              <p>Date last Worked: </p>
                              <p>{lifeclaim.employmentInformation.dateLastWorked}</p>
                            </div>
                            <div className="flex justify-between py-2">
                              <p>Occupation: </p>
                              <p>{lifeclaim.employmentInformation.occupation}</p>
                            </div>
                            <div className="flex justify-between py-2">
                              <p>Reason Stopped Working: </p>
                              <p>{lifeclaim.employmentInformation.reasonInsuredStoppedWorking}</p>
                            </div>
                          </div>
                        </div>
                        {/* Medical Information Card */}
                        <div className="border border-gray-150 rounded-lg my-2">
                          <div className="px-6 py-2">
                            <h1 className="py-2 font-semibold text-base">Medical Information</h1>
                          </div>
                          <div className="px-6 pb-4 divide-y divide-gray-200">
                            <div className="flex justify-between py-2">
                              <p>Cause of Death: </p>
                              <p>{lifeclaim.medicalInformation.causeOfDeath}</p>
                            </div>
                            <div className="flex justify-between py-2">
                              <p>Hopsitalized: </p>
                              <p>{lifeclaim.medicalInformation.hospitalized ? "True" : "False"}</p>
                            </div>
                            <div className="flex justify-between py-2">
                              <p>Type of Death: </p>
                              <p>{lifeclaim.medicalInformation.typeOfDeath}</p>
                            </div>
                          </div>
                        </div>
                        {/* Loan Information Card */}
                        <div className="border border-gray-150 rounded-lg my-2">
                          <div className="px-6 py-2">
                            <h1 className="py-2 font-semibold text-base">Loan Information</h1>
                          </div>
                          <div className="px-6 pb-4 divide-y divide-gray-200">
                            <div className="flex justify-between py-2">
                              <p>Lending Institute Name: </p>
                              <p>{lifeclaim.generalLoanInformation.nameOfLendingInstitution}</p>
                            </div>
                            <div className="flex justify-between py-2">
                              <p>Lending Institute Province: </p>
                              <p>{lifeclaim.generalLoanInformation.lendingInstitutionProvince}</p>
                            </div>
                          </div>
                        </div>
                        {/* Loan A card */}
                        <div className="flex w-full justify-around gap-4">
                          <div className="border border-gray-150 rounded-lg my-2 flex-grow">
                            <div className="px-6 py-2">
                              <h1 className="py-2 font-semibold text-base">Loan A</h1>
                            </div>
                            <div className="px-6 pb-4 divide-y divide-gray-200">
                              <div className="flex justify-between py-2">
                                <p>Type: </p>
                                <p>{lifeclaim.generalLoanInformation.loanA.typeOrPurposeOfLoan}</p>
                              </div>
                              <div className="flex justify-between py-2">
                                <p>Original: </p>
                                <p>{lifeclaim.generalLoanInformation.loanA.originalAmountOfLoan}</p>
                              </div>
                              <div className="flex justify-between py-2">
                                <p>Balance Left: </p>
                                <p>{lifeclaim.generalLoanInformation.loanA.balanceOnDateOfDeath}</p>
                              </div>
                              <div className="flex justify-between py-2">
                                <p>Applied For: </p>
                                <p>
                                  {
                                    lifeclaim.generalLoanInformation.loanA
                                      .amountOfInsuranceAppliedFor
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* Loan B Card*/}
                          <div className="border border-gray-150 rounded-lg my-2 flex-grow">
                            <div className="px-6 py-2">
                              <h1 className="py-2 font-semibold text-base">Loan B</h1>
                            </div>
                            <div className="px-6 pb-4 divide-y divide-gray-200">
                              <div className="flex justify-between py-2">
                                <p>Type: </p>
                                <p>{lifeclaim.generalLoanInformation.loanB.typeOrPurposeOfLoan}</p>
                              </div>
                              <div className="flex justify-between py-2">
                                <p>Original: </p>
                                <p>{lifeclaim.generalLoanInformation.loanB.originalAmountOfLoan}</p>
                              </div>
                              <div className="flex justify-between py-2">
                                <p>Balance Left: </p>
                                <p>{lifeclaim.generalLoanInformation.loanB.balanceOnDateOfDeath}</p>
                              </div>
                              <div className="flex justify-between py-2">
                                <p>Applied For: </p>
                                <p>
                                  {
                                    lifeclaim.generalLoanInformation.loanB
                                      .amountOfInsuranceAppliedFor
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* Loan C Card */}
                          <div className="border border-gray-150 rounded-lg my-2 flex-grow">
                            <div className="px-6 py-2">
                              <h1 className="py-2 font-semibold text-base">Loan C</h1>
                            </div>
                            <div className="px-6 pb-4 divide-y divide-gray-200">
                              <div className="flex justify-between py-2">
                                <p>Type: </p>
                                <p>{lifeclaim.generalLoanInformation.loanC.typeOrPurposeOfLoan}</p>
                              </div>
                              <div className="flex justify-between py-2">
                                <p>Original: </p>
                                <p>{lifeclaim.generalLoanInformation.loanC.originalAmountOfLoan}</p>
                              </div>
                              <div className="flex justify-between py-2">
                                <p>Balance Left: </p>
                                <p>{lifeclaim.generalLoanInformation.loanC.balanceOnDateOfDeath}</p>
                              </div>
                              <div className="flex justify-between py-2">
                                <p>Applied For: </p>
                                <p>
                                  {
                                    lifeclaim.generalLoanInformation.loanC
                                      .amountOfInsuranceAppliedFor
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
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
                                className="font-medium text-indigo-600 hover:text-indigo-500"
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
                                className="font-medium text-indigo-600 hover:text-indigo-500"
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
                  <h2 className="sr-only" id="section-2-title">
                    Section title
                  </h2>
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      <div className="h-[75vh]">
                        <div className="sticky top-0 border-b-2 border-gray-100 bg-white px-2 py-3 sm:px-6">
                          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                            <div className="ml-4 mt-4">
                              <h1 className="text-lg font-medium leading-6 text-gray-900">
                                Similar Claims
                              </h1>
                            </div>
                          </div>
                        </div>
                        {/* Similar Claims Cards */}
                        <div className="text-black">
                          <div className="border border-gray-150 rounded-lg my-2 flex-grow">
                            <div className="px-6 py-2">
                              <h1 className="py-2 font-semibold text-base">Loan C</h1>
                            </div>
                            <div className="px-6 pb-4 divide-y divide-gray-200">
                              <div className="flex justify-between py-2">
                                <p>Type: </p>
                                <p>{lifeclaim.generalLoanInformation.loanC.typeOrPurposeOfLoan}</p>
                              </div>
                              <div className="flex justify-between py-2">
                                <p>Original: </p>
                                <p>{lifeclaim.generalLoanInformation.loanC.originalAmountOfLoan}</p>
                              </div>
                              <div className="flex justify-between py-2">
                                <p>Balance Left: </p>
                                <p>{lifeclaim.generalLoanInformation.loanC.balanceOnDateOfDeath}</p>
                              </div>
                              <div className="flex justify-between py-2">
                                <p>Applied For: </p>
                                <p>
                                  {
                                    lifeclaim.generalLoanInformation.loanC
                                      .amountOfInsuranceAppliedFor
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left"></div>
          </div>
        </footer>
      </div>
    </>
  );
}
