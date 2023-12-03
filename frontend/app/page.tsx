'use client'
import dynamic from 'next/dynamic';
import Login from './components/login';
import { AuthContextProvider } from './context/AuthContext';
import Signup from './signup/page';

const ClientComponent = dynamic(() => import('./ClientComponent'), {
  ssr: false,
});

export default function Home() {
  return (
      <main>
        <AuthContextProvider>
          <div>
          {<Login/>}
          </div>
        </AuthContextProvider>
      </main>
  );
}
