'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AuthProviderWrapper from '../AuthProviderWrapper';

const Signup = () => {
  useEffect(() => {
    document.title = 'EasyClaim Signup';
  }, []);

  const router = useRouter()
  const { user, signup } = useAuth()
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleSignup = async (e: any) => {
    e.preventDefault()

    try {
      await signup(data.email, data.password)
      router.push('/')
      console.info('trying to signup')
    } catch (err) {
      console.error(err)
      console.error('error signing up')
    }
  }

  return (
      <div className='h-screen  justify-center'>
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img className="mx-auto h-16 w-auto" src="/logo.png" alt="Your Company"/>
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-757575">Sign up as an adjudicator</h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-6" action="#" method="POST">
                  <div>
                      <label className="block text-sm font-medium leading-6 text-757575">Email address</label>
                      <div className="mt-2">
                      <input id="email" onChange={(e: any) =>
                setData({
                  ...data,
                  email: e.target.value,
                })
              } value={data.email} name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#43934B] sm:text-sm sm:leading-6 pl-2"/>
                      </div>
                  </div>

                  <div>
                      <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium leading-6 text-757575">Password</label>
                      </div>
                      <div className="mt-2">
                      <input id="password" onChange={(e: any) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              } value={data.password} name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-757575 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#43934B] sm:text-sm sm:leading-6 pl-2" />
                      </div>
                  </div>

                  <div>
                      <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium leading-6 text-757575">Repeat Password</label>
                      </div>
                      <div className="mt-2">
                      <input id="password" name="retype password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-757575 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#43934B] sm:text-sm sm:leading-6 pl-2" />
                      </div>
                  </div>

                  <div>
                      <button type="submit" onClick={handleSignup} className="flex w-full justify-center rounded-md bg-[#43934B] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#43934B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#43934B]">Sign Up</button>
                  </div>
                  <div className="text-sm">
                          <Link href="/">
                              <p className="font-semibold text-[#43934B] hover:text-[#43934B]">Already have an account? Login here!</p>
                          </Link>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  );
}

const SignupWithAuthProvider = () => (
  <AuthProviderWrapper>
    <Signup />
  </AuthProviderWrapper>
);

export default SignupWithAuthProvider;
