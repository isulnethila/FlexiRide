import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (user, token) => {
    setLoggedIn(true);
    setUsername(user);
    setUserToken(token);
  };

  const logout = () => {
    setLoggedIn(false);
    setUsername(null);
    setUserToken(null);
  };

  const checkLoginStatus = () => {
    // Implement persistent login check if needed
    setIsLoading(false);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, loggedIn, username, userToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
