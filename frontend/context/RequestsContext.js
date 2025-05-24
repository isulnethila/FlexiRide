import React, { createContext, useContext, useState } from 'react';

const RequestsContext = createContext();

const initialRequests = [
  {
    id: '1',
    type: 'new',
    message: 'You have a new rental request for your Toyota Prius from April 12–14.',
    status: null,
  },
  {
    id: '2',
    type: 'pending',
    message: 'Request for Honda Civic from April 12–14.',
    status: 'Pending',
  },
  {
    id: '3',
    type: 'accepted',
    message: 'Request for Honda Civic from April 12–14.',
    status: 'Accepted',
  },
];

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState(initialRequests);

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
