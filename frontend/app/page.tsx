'use client'
import dynamic from 'next/dynamic';
import FormCard from './components/FormCard';
import Login from './login';
import Signup from './signup';
import { AuthContextProvider } from './context/AuthContext';
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
        <div>
          {<Signup/>}
        </div>
      </AuthContextProvider>
    </main>
  );
}
