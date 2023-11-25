'use client'
import React, { useState } from 'react'
import { useAuth } from './context/AuthContext'

const Signup = () => {
  const { user, signup } = useAuth()
  console.log(user)
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleSignup = async (e: any) => {
    e.preventDefault()

    try {
        console.log(data.email, data.password)
      await signup(data.email, data.password)
      console.log('trying to signup')
    } catch (err) {
        console.log(data.email, data.password)
      console.log(err)
        console.log('error signing up')
    }

    console.log(data)
  }

  return (
    <div>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="/Logo.png" alt="Your Company"/>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up as an adjudicator</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                    <input id="email" onChange={(e: any) =>
              setData({
                ...data,
                email: e.target.value,
              })
            } value={data.email} name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#43934B] sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div className="mt-2">
                    <input id="password" onChange={(e: any) =>
              setData({
                ...data,
                password: e.target.value,
              })
            } value={data.password} name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#43934B] sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Repeat Password</label>
                    </div>
                    <div className="mt-2">
                    <input id="password" name="retype password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#43934B] sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <button type="submit" onClick={handleSignup} className="flex w-full justify-center rounded-md bg-[#43934B] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#43934B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#43934B]">Sign Up</button>
                </div>
                </form>
            </div>
        </div>

    </div>
  );
}

export default Signup