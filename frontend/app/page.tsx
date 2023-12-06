'use client'
import dynamic from 'next/dynamic';
import Login from './components/login';
import { AuthContextProvider } from './context/AuthContext';

const ClientComponent = dynamic(() => import('./EndpointTester'), {
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
