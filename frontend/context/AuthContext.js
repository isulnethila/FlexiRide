import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (user) => {
    setLoggedIn(true);
    setUsername(user);
  };

  const logout = () => {
    setLoggedIn(false);
    setUsername(null);
  };

  const checkLoginStatus = () => {
    // Implement persistent login check if needed
    setIsLoading(false);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, loggedIn, username, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
