import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (vehicle) => {
    setFavorites((prev) => {
      if (!prev.find((v) => v.id === vehicle.id)) {
        return [...prev, vehicle];
      }
      return prev;
    });
  };

  const removeFavorite = (vehicleId) => {
    setFavorites((prev) => prev.filter((v) => v.id !== vehicleId));
  };

  const isFavorite = (vehicleId) => {
    return favorites.some((v) => v.id === vehicleId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
