// AuthProvider.js
'use client'

import React, { createContext, useState, useContext } from 'react';

// Create the context for authentication
export const AuthContext = createContext({
  isUserValid: false,
  setIsUserValid: () => {}
});

// AuthProvider component
export const AuthProvider = ({ children }) => {
  // State to manage user validation
  const [isUserValid, setIsUserValid] = useState(false);

  return (
    <AuthContext.Provider value={{ isUserValid, setIsUserValid }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);
