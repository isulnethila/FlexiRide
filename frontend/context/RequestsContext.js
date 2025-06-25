import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import API_BASE_URL from '../config/apiConfig';

const RequestsContext = createContext();

export const RequestsProvider = ({ children }) => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      axios
        .get(`${API_BASE_URL}/api/notifications/user/${user.id.toString()}`)
        .then((response) => {
          setRequests(response.data);
        })
        .catch((error) => {
          console.error('Error fetching notifications:', error);
        });
    }
  }, [user]);

  const removeRequest = (id) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const updateRequestStatus = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus, type: newStatus.toLowerCase() } : req
      )
    );
  };

  return (
    <RequestsContext.Provider value={{ requests, removeRequest, updateRequestStatus }}>
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequests = () => useContext(RequestsContext);
