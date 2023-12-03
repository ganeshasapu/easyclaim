'use client'
import { useRouter } from 'next/navigation'
import React, {useEffect, useState} from 'react'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link';


const Login = () => {

    useEffect(() => {
        document.title = 'EasyClaim Login';
    }, []);

  const router = useRouter()
  const { user, login } = useAuth()
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  console.log(login)

  const handleLogin = async (e: any) => {
    e.preventDefault()

    console.log(user)
    try {
        console.log(data.email, data.password)
        await login(data.email, data.password)
        router.push('/inbox')
        console.log('trying to login')
    } catch (err) {
        console.log(err)
        console.log('error logging in')
    }
  }

  return (
    <div>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-16 w-auto" src="/logo.png" alt="Your Company"/>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-757575">Sign in to your account</h2>
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
                    <div className="text-sm">
                        <a href="#" className="font-semibold text-[#43934B] hover:text-[#43934B]">Forgot password?</a>
                    </div>
                    </div>
                    <div className="mt-2">
                    <input id="password" onChange={(e: any) =>
              setData({
                ...data,
                password: e.target.value,
              })
            } value={data.password} name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#43934B] sm:text-sm sm:leading-6 pl-2" />
                    </div>
                </div>

                <div>
                    <button type="submit" onClick={handleLogin} className="flex w-full justify-center rounded-md bg-[#43934B] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#43934B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#43934B]">Sign in</button>
                </div>
                <div className="text-sm">
                        <Link href="/signup">
                            <p className="font-semibold text-[#43934B] hover:text-[#43934B]">No account yet? Sign up here!</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>

    </div>
  );
}

export default Login