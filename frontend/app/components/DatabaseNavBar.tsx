import Link from "next/link";
import {Menu, Popover} from "@headlessui/react"
import { Dialog, Disclosure, Transition} from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'

const css = `
  .gradient-div{
    background-color: linear-gradient(red 40%, yellow 30%, blue 65%);
  }
  .dropdown:hover .dropdown-menu {
    display: block;
  }
        `

const top_space = {
    padding: 10,
    width: 85,
    height: 70,
  };

const user = {
    name: "Stacy",
    email: "stacy@mail.securian.com",
    imageUrl:
      "https://i0.wp.com/www.sfnwseries.com/wp-content/uploads/2017/11/team-1-4-person-circle-p2-200-1.png?ssl=1",
    image: "/stacy.jpg",
};

const DatabaseNavBar = () => {
    return(
      
        <div className="flex w-full p-4 items-center border-b border-white gradient-crown bg-white">
                <Link href="https://www.securiancanada.ca/?utm_source=google&utm_medium=ps&utm_campaign=brand&utm_content=english&utm_term=securian-canada&gad_source=1">
              <img className={`width: 300px`} src="/logo.png" alt="Your Company" style={top_space}/>
            </Link>
            


                {/* <div className="flex w-full items-center justify-evenly p-2 gap-8" > */}
                <div className={`bg-white justify flex p-2 gap-8 w-full`}>
                    <Link className="py-2 border rounded w-full px-4 text-center bg-white" href={"/inbox"}>
                      Inbox
                    </Link>
                    <div className="py-2 border rounded w-full px-4 bg-[#0b9541] text-white text-center font-bold">
                      Database
                    </div>
                </div>

          
          <div className="flex">
            
              {/* <Menu as="div" className="relative ml-4 flex-shrink-0">
              <div>
                <Menu.Button className="relative flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                      
                </Menu.Button>
              </div>
              </Menu> */}
              <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full rounded-md bg-white px-1 py-1 text-sm font-semibold">
          {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
          <img className="h-9 w-5 rounded-full" src={user.image} alt="Stacy" style={top_space} />
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
                    <Link href="/"> Log Out</Link>
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
        
    )
}

export default DatabaseNavBar;