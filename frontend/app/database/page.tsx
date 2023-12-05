'use client'
import { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import Link from "next/link";
import { get } from 'http'

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};


// const subCategories = [
//   { name: 'Totes', href: '#' },
// ]
const filters = [
  {
    id: 'amount',
    name: 'Amount Applied For',
    options: [
        { value: '1', label: '0-25K', checked: false },
        { value: '2', label: '25K-50K', checked: false },
        { value: '3', label: '50K+', checked: false },
    ],
},
{
    id: 'time',
    name: 'Time',
    options: [
        { value: '4', label: 'This month', checked: false },
        { value: '5', label: 'Last 6 months', checked: false },
        { value: '6', label: 'This year', checked: false },
        { value: '7', label: 'More than a year', checked: false },
    ],
  }
]

export default function Database() {
    const [historicalClaims, setHistoricalClaims] = useState<LifeClaim[]>([]);
    const router = useRouter()

    useEffect(() => {
        document.title = 'EasyClaim Dashboard';
        // Convert your dictionary to query parameters
        getData();
    }, []);

    const routeToClaim = async (id: String) => {
        try {
            router.push('/historical_claim/' + id)
        } catch (err) {}
    }

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [checkboxState, setCheckboxState] = useState<Record<string, boolean>>({
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7': false,
  });

  // Handle checkbox change
  const handleCheckboxChange = (optionValue: string) => {
    setCheckboxState((prevCheckboxState) => {
      const newState = { ...prevCheckboxState, [optionValue]: !prevCheckboxState[optionValue] };

      const queryParams = new URLSearchParams(newState as any);


      // Append the query parameters to the API endpoint
      getFilteredData(`${queryParams}`);
      return newState;
    });
  };

  const getData = () => {
    fetch("/api/get_life/Historical")
        .then((response) => response.json())
        .then((data: LifeClaim[]) => {
            setHistoricalClaims(data);
        });
    }

  const getFilteredData = (params: String) => {
    console.log("/api/get_filtered/" + params)
    fetch("/api/get_filtered/" + params)
        .then((response) => response.json())
        .then((data: LifeClaim[]) => {
            setHistoricalClaims(data);
        }).catch((error) => {console.log(error)});
}

  return (
    <>
      <main className="flex h-screen w-full flex-col items-center justify-between">
        <div className="flex w-full p-4 items-center border-b border-white">
          <div className="flex w-full items-center justify-evenly p-2 gap-8">
            <Link className="py-2 border rounded w-full px-4 text-center" href={"/inbox"}>
              Inbox
            </Link>
            <div className="py-2 border rounded w-full px-4 bg-green-50 text-black text-center font-bold">
              Database
            </div>
          </div>
          <div className="flex">
            <div className="rounded-full bg-green-300 w-10 h-10" />
          </div>
        </div>
        <div className="pt-2 relative mx-auto text-gray-600">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
            width="10000px"
          ></input>
          <button type="submit" className="absolute right-0 top-0 mt-5 mr-4 border-gray">
            <svg
              className="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              width="1028px"
              height="512px"
            >
              // style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
        <div className="flex h-full justify-center w-full border-gray-200 border-t  bg-gray-50 ">
          <div className="w-[90%] h-full pt-8 text-2xl font-semibold">
            <div className="min-w-full p-4 drop-shadow-md rounded-md border bg-white flex flex-col gap-2">
              <div className="">Historical Claims</div>
              <div className="flex items-center">
                <div className="text-sm text-gray-500 font-normal">
                  These claims have already been processed
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[75%] bg-gray-50 flex justify-center">
          <div className="w-[90%] flex gap-4 justify-between bg-gray-50 py-4">
            <div className="w-[30%] flow-root shadow-xl border bg-white rounded-md overflow-scroll no-scrollbar">
              <form className="hidden lg:block p-4">
                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  // checked={checkboxState[option.value]}
                                  onChange={() => handleCheckboxChange(option.value)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-757575"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </div>
            <div className="w-full flow-root shadow-xl border bg-white rounded-md overflow-scroll no-scrollbar">
              <div className="">
                <div className="inline-block min-w-full py-2 align-middle lg:px-4">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="">
                      <tr>
                        <th
                          scope="col"
                          className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                        >
                          Claim ID
                        </th>
                        <th
                          scope="col"
                          className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                        >
                          Claim Amount
                        </th>
                        <th
                          scope="col"
                          className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5  text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter "
                        >
                          Claim Type
                        </th>
                        <th
                          scope="col"
                          className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-4"
                        >
                          Date Occurred
                        </th>
                      </tr>
                    </thead>
                    {historicalClaims ? (
                      <tbody className="divide-y divide-gray-200 bg-white overflow-scroll">
                        {historicalClaims.map((currentClaim) => (
                          <tr
                            key={currentClaim.claimNumber}
                            className="bg-white hover:bg-gray-50 active:bg-gray-100"
                          >
                            <td
                              onClick={async () => {
                                routeToClaim(currentClaim.claimNumber);
                              }}
                              className="cursor-pointer border-b border-slate-100 p-4 pl-8 text-gray-600"
                            >
                              {currentClaim.claimNumber}
                            </td>
                            <td
                              onClick={async () => {
                                routeToClaim(currentClaim.claimNumber);
                              }}
                              className="cursor-pointer border-b border-slate-100 p-4 text-gray-600"
                            >
                              $
                              {
                                currentClaim.generalLoanInformation.loanA
                                  .amountOfInsuranceAppliedFor
                              }
                            </td>
                            <td
                              onClick={async () => {
                                routeToClaim(currentClaim.claimNumber);
                              }}
                              className="cursor-pointer border-b border-slate-100 p-4 pr-8 text-gray-600"
                            >
                              Life
                            </td>
                            <td
                              onClick={async () => {
                                routeToClaim(currentClaim.claimNumber);
                              }}
                              className="cursor-pointer border-b border-slate-100  p-4 pr-8 text-gray-600"
                            >
                              {currentClaim.dateOccured}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <div className="bg-gray-700 w-48 animate-pulse h-[5vh] rounded-2xl"></div>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
