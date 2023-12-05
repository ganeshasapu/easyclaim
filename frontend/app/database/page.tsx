'use client'
import { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import Link from "next/link";
import { get } from 'http'


// const subCategories = [
//   { name: 'Totes', href: '#' },
// ]

const user = {
    name: "Stacy",
    email: "tom@example.com",
    image: "/public/stacy.png",
    imageUrl: "https://i0.wp.com/www.sfnwseries.com/wp-content/uploads/2017/11/team-1-4-person-circle-p2-200-1.png?ssl=1",
};

const top_space = {
    padding: 10,
    width: 85,
    height: 70,
  };

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
  const [checkboxState, setCheckboxState] = useState({
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7': false,
  });

  // Handle checkbox change
  const handleCheckboxChange = (optionValue) => {
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
    <main className="flex h-screen w-full flex-col items-center justify-between">
        <div className="flex w-full p-4 items-center border-b border-white">
                <Link href="https://www.securiancanada.ca/?utm_source=google&utm_medium=ps&utm_campaign=brand&utm_content=english&utm_term=securian-canada&gad_source=1">
                    <img className="h-8 w-8 rounded-full" src="/Logo.png" alt="Your Company" style={top_space}/>
                </Link>
            <div className="flex w-full items-center justify-evenly p-2 gap-8">
                <Link
                    className="py-2 border rounded w-full px-4 text-center"
                    href={"/inbox"}>
                    Inbox
                </Link>
                <div
                    className="py-2 border rounded w-full px-4 bg-green-50 text-black text-center font-bold">
                    Database
                </div>
            </div>
            <div className="flex">
                {/* <Dropdown inline label="">
                        <Dropdown.Item>
                        <Link href="/" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 light:hover:text-black">Log Out</Link>
                        </Dropdown.Item>
                    </Dropdown> */}
                    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full rounded-md bg-white px-1 py-1 text-sm font-semibold">
          {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
          <img className="h-9 w-5 rounded-full" src={user.imageUrl} alt="Stacy" style={top_space} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
            
        <Menu.Items className="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-center">
          <div className="py-1">
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button type="submit">
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
            </div>
        </div>
        <div className="w-full h-full flex">
            <div className="w-full h-full text-white p-4">
                <div className="bg-white">
                <div>
                    {/* Mobile filter dialog */}
                    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                type="button"
                                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                onClick={() => setMobileFiltersOpen(false)}
                                >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                <h3 className="sr-only">Categories</h3>
                                {filters.map((section) => (
                                <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                    {({ open }) => (
                                    <>
                                        <h3 className="-mx-2 -my-3 flow-root">
                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
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
                            </Dialog.Panel>
                        </Transition.Child>
                        </div>
                    </Dialog>
                    </Transition.Root>

                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
                        <h1 className="text-4xl font-bold tracking-tight ">Historical Claims</h1>

                    <div className="flex items-center">
                        <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                            <span className="sr-only">View grid</span>
                            <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <span className="sr-only">Filters</span>
                            <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                        Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        {/* Filters */}
                        <form className="hidden lg:block">
                            <h3 className="sr-only">Categories</h3>
                            {/* <ul role="list" className="space-y-4  pb-6 text-sm font-medium text-gray-900">
                            {subCategories.map((category) => (
                                <li key={category.name}>
                                <a href={category.href}>{category.name}</a>
                                </li>
                            ))}
                            </ul> */}

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

                        {/* Product grid */}
                        <div className="lg:col-span-3">{/* Your content */}</div>
                        </div>
                        <div className="w-full h-full flex">
                            <div className="w-[20vw] h-full bg-black-50"></div>
                            <div className="w-full h-full text-black p-4">
                                <div className="shadow-sm overflow-hidden my-8">
                                    <table className="border-collapse table-auto w-full text-sm">
                                        <thead>
                                        <tr>
                                            <th className="border-b white:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Claim ID</th>
                                            <th className="border-b white:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Claim Amount</th>
                                            <th className="border-b white:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Claim Type</th>
                                            <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Date</th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-black dark:bg-slate-800">
                                        {historicalClaims.map((historicalClaim) => (
                                            <tr key={historicalClaim.claimNumber}>
                                                <td onClick={async () => {routeToClaim(historicalClaim.claimNumber)}} className="cursor-pointer border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{historicalClaim.claimNumber}</td>
                                                <td onClick={async () => {routeToClaim(historicalClaim.claimNumber)}} className="cursor-pointer border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">${historicalClaim.generalLoanInformation.loanA.amountOfInsuranceAppliedFor}</td>
                                                <td onClick={async () => {routeToClaim(historicalClaim.claimNumber)}} className="cursor-pointer border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">Life</td>
                                                <td onClick={async () => {routeToClaim(historicalClaim.claimNumber)}} className="cursor-pointer border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">{historicalClaim.dateOccured}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>

                    </section>
                    </main>
                </div>
                </div>
            </div>
        </div>
    </main>

  )
}