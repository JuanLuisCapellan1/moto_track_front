import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from './AuthContext';

const DEFAULT_PRIMARY_COLOR = "#635BFF";
const COLOR_STORAGE_KEY = "mototrack_user_colors";

const PrimaryColorContext = createContext({
  primaryColor: DEFAULT_PRIMARY_COLOR,
  setPrimaryColor: () => {},
});

export const PrimaryColorProvider = ({ children }) => {
  const { currentUser } = useAuth() || { currentUser: null };
  const userId = currentUser?.id || 'guest';
  
  // Get stored primary color for current user
  const getStoredColor = () => {
    try {
      const storedColors = localStorage.getItem(COLOR_STORAGE_KEY);
      if (storedColors) {
        const colorData = JSON.parse(storedColors);
        return colorData[userId] || DEFAULT_PRIMARY_COLOR;
      }
    } catch (error) {
      console.error("Error retrieving stored color:", error);
    }
    return DEFAULT_PRIMARY_COLOR;
  };

  const [primaryColor, setPrimaryColorState] = useState(() => getStoredColor());
  
  // Store color whenever it changes
  const setPrimaryColor = (color) => {
    setPrimaryColorState(color);
    try {
      const storedColors = JSON.parse(localStorage.getItem(COLOR_STORAGE_KEY) || '{}');
      storedColors[userId] = color;
      localStorage.setItem(COLOR_STORAGE_KEY, JSON.stringify(storedColors));
    } catch (error) {
      console.error("Error storing color preference:", error);
    }
  };

  // Update color when user changes
  useEffect(() => {
    setPrimaryColorState(getStoredColor());
  }, [userId]);

  return (
    <PrimaryColorContext.Provider value={{ primaryColor, setPrimaryColor }}>
      {children}
    </PrimaryColorContext.Provider>
  );
};

export const usePrimaryColor = () => useContext(PrimaryColorContext);