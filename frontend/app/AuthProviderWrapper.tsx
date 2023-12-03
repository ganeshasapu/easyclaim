import React from 'react';
import { AuthContextProvider } from './context/AuthContext';

const AuthProviderWrapper = ({ children }: any) => {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  );
}

export default AuthProviderWrapper;
