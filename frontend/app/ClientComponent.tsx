'use client'

import React, { useState } from 'react';
import jsonData from '../../dummy_data/life_claims/life_claim_data.json';


interface UserData{
  name: string;
  age: number;
  documentName: string
}

export default function ClientComponent() {
  const [inputValue, setInputValue] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState<UserData | null>(null);

  const handleSearchClick = async () => {
    alert(`Searching for user with ${inputValue}`);
    try {
      const name = inputValue;
      const apiUrl = `/api/people/${encodeURIComponent(name)}`;
      console.log(apiUrl);

      const response = await fetch(apiUrl);
      console.log(response);

      if (!response.ok) {
        throw new Error('error in response');
      }

      const data = await response.json();
      console.log(typeof data);

      console.log(`Search result: ${JSON.stringify(data)}`);
      setResult(data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleCreateClick = async () => {
    alert(`Creating user with Document Name: ${documentName}, Name: ${name}, Age: ${age}`);
    try {
      const documentNameValue = documentName;
      const nameValue = name;
      const ageValue = age;

      const requestBody = {
        documentName: documentNameValue,
        name: nameValue,
        age: ageValue,
      };

      const requestBodyJSON = JSON.stringify(requestBody);
      console.log(requestBodyJSON);

      const apiUrl = `/api/people/`

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBodyJSON,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(`Create result: ${JSON.stringify(data)}`);
    } catch (error) {
      console.log('Error creating user:', error);
    }
  };

  const uploadJSON = () => {
    jsonData.forEach( async (claim) => {
      console.log(claim)
      try {
        const apiUrl = 'api/upload/'
        const requestBodyJSON = JSON.stringify(claim);
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: requestBodyJSON
        });
    
        console.log(response);
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
          console.log(`Create result: ${JSON.stringify(data)}`);
        } catch (error) {
          console.log('Error creating user:', error);
        }
    });
      


    
    
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Find a User</h1>
        <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Enter name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <button onClick={handleSearchClick}>Search</button>
        <h2>User Information</h2>
        <p>Name: {result?.name}</p>
        <p>Age: {result?.age}</p>
        <p>Document Name: {result?.documentName}</p>
      </div>
      <div>
        <h1>Create a User</h1>
        <input
          type='text'
          placeholder='Document Name'
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          type='number'
          placeholder='Age'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button onClick={handleCreateClick}>Create</button>
        <div className='h-[200px]'></div>
        <button onClick={uploadJSON}>Upload JSON</button>
      </div>
    </main>
  );
}
