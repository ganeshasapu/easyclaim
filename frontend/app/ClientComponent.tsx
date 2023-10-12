'use client'

import React, { useState } from 'react';
//import * as express from 'express';
//import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';

export default function ClientComponent() {
  const [inputValue, setInputValue] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState('');

  const handleSearchClick = async () => {
    alert(`Searching for user with ${inputValue}`);
    try {
      const name = inputValue;

      //const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/people/${encodeURIComponent(name)}`;
      //const app = express();
      //app.use('/api', createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));
      //app.listen(3000);

      const apiUrl = `/api/people/${encodeURIComponent(name)}`;
      console.log(apiUrl);

      const response = await fetch(apiUrl);
      console.log(response);

      if (!response.ok) {
        throw new Error('error in response');
      }

      const data = await response.json();

      console.log(`Search result: ${JSON.stringify(data)}`);
      setResult(JSON.stringify(data));
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
      console.log(`Create result: ${JSON.stringify(data)}`);
    } catch (error) {
      console.log('Error creating user:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Find a User</h1>
        <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Enter name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <button onClick={handleSearchClick}>Search</button>
        <h2>{result}</h2>
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
      </div>
    </main>
  );
}
