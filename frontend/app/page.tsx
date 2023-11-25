import dynamic from 'next/dynamic';

const ClientComponent = dynamic(() => import('./ClientComponent'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
      </div>
      <div>
        <ClientComponent />
      </div>
    </main>
  );
}
