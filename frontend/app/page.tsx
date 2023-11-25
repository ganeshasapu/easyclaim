import dynamic from 'next/dynamic';
import FormCard from './components/FormCard';
import LoginComponent from './components/authentication/login';
import SignUpComponent from './components/authentication/signup';

const ClientComponent = dynamic(() => import('./ClientComponent'), {
  ssr: false, 
});

export default function Home() {
  return (
    <main>
      <div>
        {<LoginComponent/>}
      </div>
      <div>
        {<SignUpComponent/>}
      </div>
    </main>
  );
}
