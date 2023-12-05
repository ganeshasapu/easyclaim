"use client"

import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import {set} from "@firebase/database";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import stacy from "/public/stacy.png"

const filters = [
    {
      id: 'claim',
      name: 'Claim Type',
      options: [
        { value: 'Claim Amount (High to Low)', label: 'Claim Amount (High to Low)', checked: false },
        { value: 'Claim Amount (Low to High)', label: 'Claim Amount (Low to High)', checked: false },
        { value: 'Date (New to Old)', label: 'Date (New to Old)', checked: true },
        { value: 'Date (Old to New)', label: 'Date (Old to New)', checked: true },
      ],
    }
]

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

export const images : {[key:string] : any} = {
    "/public/stacy.png": stacy,
}

export default function Inbox() {
    const router = useRouter()
    const [currentClaims, setCurrentClaims] = useState<LifeClaim[]>([]);

    useEffect(() => {
        document.title = 'EasyClaim Dashboard';
        getData();
    }, []);

    const getData = () => {
        fetch("/api/get_life/Current")
            .then((response) => response.json())
            .then((data: LifeClaim[]) => {
                setCurrentClaims(data);
            });
    }

    const routeToClaim = async (id: String) => {
        try {
            router.push('/claim/' + id)
        } catch (err) {}
    }

    return (
        <main className="flex h-screen w-full flex-col items-center justify-between">
            <div className="flex w-full p-4 items-center border-b border-white">
                <Link href="https://www.securiancanada.ca/?utm_source=google&utm_medium=ps&utm_campaign=brand&utm_content=english&utm_term=securian-canada&gad_source=1">
                    <img className="h-8 w-8 rounded-full" src="/Logo.png" alt="Your Company" style={top_space}/>
                </Link>
                <div className="flex w-full items-center justify-evenly p-2 gap-8">
                    <div
                        className="py-2 border rounded w-full px-4 bg-green-50 text-black text-center font-bold"

                    >
                        Inbox
                    </div>

                    <Link
                        className="py-2 border rounded w-full px-4 text-center"
                        href={"/database"}
                    >
                        Database
                    </Link>
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
            <div className="pt-2 relative mx-auto text-gray-600">
                <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search" name="search" placeholder="Search" width="10000px"></input>
                <button type="submit" className="absolute right-0 top-0 mt-5 mr-4 border-gray">
                    <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" width="1028px" height="512px">
                        // style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
                    </svg>
                </button>
            </div>
            <div></div>
            <div className="w-full h-full flex">
                <div className="w-[20vw] h-full bg-black-50"></div>
                <div className="w-full h-full text-black p-4">
                    <h1 className="text-3xl font-bold">Claims to Process</h1>

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
                            {currentClaims.map((currentClaim) => (
                                <tr key={currentClaim.claimNumber}>
                                    <td onClick={async () => {routeToClaim(currentClaim.claimNumber)}} className="cursor-pointer border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{currentClaim.claimNumber}</td>
                                    <td onClick={async () => {routeToClaim(currentClaim.claimNumber)}} className="cursor-pointer border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">${currentClaim.generalLoanInformation.loanA.amountOfInsuranceAppliedFor}</td>
                                    <td onClick={async () => {routeToClaim(currentClaim.claimNumber)}} className="cursor-pointer border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">Life</td>
                                    <td onClick={async () => {routeToClaim(currentClaim.claimNumber)}} className="cursor-pointer border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">{currentClaim.dateOccured}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </main>
    );
}
