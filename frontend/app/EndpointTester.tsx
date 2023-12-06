"use client";

import React, { useState } from 'react';
import jsonData from '../../dummy_data/life_claims/life_claim_data.json';


interface UserData{
  name: string;
  age: number;
  documentName: string
}

export default function JsonGenerator() {
  const [inputValue, setInputValue] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState<UserData | null>(null);
  const [inputClaimNumber, setInputClaimNumber] = useState('');

  const handleSearchClick = async () => {
    alert(`Searching for user with ${inputValue}`);
    try {
      const name = inputValue;
      const apiUrl = `/api/people/${encodeURIComponent(name)}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('error in response');
      }

      const data = await response.json();

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
    } catch (error) {
      console.log('Error creating user:', error);
    }
  };

  const uploadCurrentLife = async () => {
    for (let i=0 ; i<jsonData.length; i++){
      await new Promise((r) => setTimeout(r, 150));
      try {
        const apiUrl = 'api/upload_life/current'
        const requestBodyJSON = JSON.stringify(jsonData[i]);
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
        } catch (error) {
          console.log('Error creating user:', error);
        }
    }
  }

  const uploadHistoricalLife = async () => {
    for (let i = 0; i < jsonData.length; i++) {
      await new Promise((r) => setTimeout(r, 150));
      try {
        const apiUrl = "api/upload_life/historical";
        const requestBodyJSON = JSON.stringify(jsonData[i]);
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBodyJSON,
        });


        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
      } catch (error) {
        console.log("Error creating user:", error);
      }
    }
  }

  const getCurrentLifeClaims = async () => {
    try {
      const apiUrl = '/api/get_life/Current';
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('could not get life claim');
      }
      const data = await response.json() as Array<LifeClaim>;
    } catch(error) {
      console.log('error getting life claim:', error)
    }
  }

  const getHistoricalLifeClaims = async () => {
    try {
      const apiUrl = '/api/get_life/Historical';
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('could not get life claim');
      }
      const data = await response.json() as Array<LifeClaim>;
    } catch(error) {
      console.log('error getting life claim:', error)
    }
  }

  const getSimilarLifeClaims = async () => {
    try{
      const apiUrl = '/api/get_similar_life/' + inputClaimNumber;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('could not get similar life claims');
      }
      const data = await response.json() as Array<LifeClaim>;
    }catch(error) {
      console.log('error getting similar life claims: ', error);
    }
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
        <button onClick={uploadCurrentLife}>Upload Current Life Claim</button>
        <div className='h-[200px]'></div>
        <button onClick={uploadHistoricalLife}>Upload Historical Life Claim</button>
        <div className='h-[200px]'></div>
        <button onClick={getCurrentLifeClaims}>Get Current Life Claims</button>
        <div className='h-[200px]'></div>
        <button onClick={getHistoricalLifeClaims}>Get Historical Life Claims</button>
        <div className='h-[200px]'></div>
        <button onClick={getHistoricalLifeClaims}>Get Historical Life Claims</button>
        <div className='h-[200px]'></div>
        <h1>Get Similar Life Claims</h1>
        <input type='text' value={inputClaimNumber} onChange={(e) => setInputClaimNumber(e.target.value)} placeholder='Enter claim number'/>
        <br></br><br></br><button onClick={getSimilarLifeClaims}>Find claims</button>
      </div>
    </main>
  );
}
