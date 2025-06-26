import React, { createContext, useState, useEffect } from 'react';

import { useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (user, id, token) => {
    setLoggedIn(true);
    setUsername(user);
    setUserId(id);
    setUserToken(token);
  };

  const logout = () => {
    setLoggedIn(false);
    setUsername(null);
    setUserId(null);
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
    <AuthContext.Provider value={{ login, logout, loggedIn, username, userId, userToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
