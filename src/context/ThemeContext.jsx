import React, { createContext, useState, useContext, useEffect } from "react";
import { ConfigProvider, theme } from "antd";
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useAuth } from './AuthContext';
import { usePrimaryColor } from './PrimaryColorContext';

const THEME_STORAGE_KEY = "mototrack_user_themes";

// Define default token values to prevent undefined errors
const DEFAULT_TOKENS = {
  sidebarBg: "#F9F9F9",
  contentBg: "#FFFFFF",
  subtitleColor: "#666666",
  titleColor: "#000000",
  subtitleBlack: "rgba(0, 0, 0, 0.45)",
  colorPrimary: "#635BFF"
};

const createBaseThemes = () => ({
  themeLight: {
    algorithm: theme.defaultAlgorithm,
    token: {
      ...DEFAULT_TOKENS,
      sidebarBg: "#F9F9F9",
      contentBg: "#FFFFFF",
      subtitleColor: "#666666",
      titleColor: "#000000",
      subtitleBlack: "rgba(0, 0, 0, 0.45)"
    }
  },
  themeDark: {
    algorithm: theme.darkAlgorithm,
    token: {
      ...DEFAULT_TOKENS,
      sidebarBg: "#0F0F10",
      contentBg: "#000000",
      subtitleColor: "#eeeeee",
      titleColor: "#FFFFFF",
      subtitleBlack: "rgba(255, 255, 255, 0.75)"
    }
  }
});

// Initialize with default theme to prevent undefined
const initialTheme = createBaseThemes().themeLight;

const themeContext = createContext({
  currentTheme: 'themeLight',
  switchTheme: () => {},
  theme: initialTheme // Provide default theme initially
});

export const ThemeProvider = ({ children }) => {
  const { currentUser } = useAuth() || { currentUser: null };
  const userId = currentUser?.id || 'guest';
  const { primaryColor } = usePrimaryColor();
  
  // Get stored theme for current user
  const getStoredTheme = () => {
    try {
      const storedThemes = localStorage.getItem(THEME_STORAGE_KEY);
      if (storedThemes) {
        const themeData = JSON.parse(storedThemes);
        return themeData[userId] || 'themeLight';
      }
    } catch (error) {
      console.error("Error retrieving stored theme:", error);
    }
    return 'themeLight';
  };

  const [currentTheme, setCurrentThemeState] = useState(() => getStoredTheme());
  
  // Store theme whenever it changes
  const setCurrentTheme = (theme) => {
    const newTheme = typeof theme === 'function' ? theme(currentTheme) : theme;
    setCurrentThemeState(newTheme);
    
    try {
      const storedThemes = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) || '{}');
      storedThemes[userId] = newTheme;
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(storedThemes));
    } catch (error) {
      console.error("Error storing theme preference:", error);
    }
  };

  const switchTheme = () => setCurrentTheme(prevTheme => 
    prevTheme === 'themeLight' ? 'themeDark' : 'themeLight'
  );

  // Update theme when user changes
  useEffect(() => {
    setCurrentThemeState(getStoredTheme());
  }, [userId]);

  // Apply theme to document
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  // Get base themes and apply primary color
  const baseThemes = createBaseThemes();
  const themes = {
    themeLight: {
      ...baseThemes.themeLight,
      token: {
        ...baseThemes.themeLight.token,
        colorPrimary: primaryColor || DEFAULT_TOKENS.colorPrimary
      }
    },
    themeDark: {
      ...baseThemes.themeDark,
      token: {
        ...baseThemes.themeDark.token,
        colorPrimary: primaryColor || DEFAULT_TOKENS.colorPrimary
      }
    }
  };

  // Create the final theme object with current theme settings
  const currentThemeObject = themes[currentTheme] || themes.themeLight;

  // Add the currentTheme name to the theme object for reference in styled-components
  const themeWithName = {
    ...currentThemeObject,
    currentTheme,
    token: {
      ...currentThemeObject.token,
      currentTheme
    }
  };

  return (
    <themeContext.Provider value={{
      currentTheme, 
      switchTheme,
      theme: themeWithName
    }}>
      <StyledThemeProvider theme={themeWithName}>
        <ConfigProvider theme={currentThemeObject}>
          {children}
        </ConfigProvider>
      </StyledThemeProvider>
    </themeContext.Provider>
  );
};

export const useTheme = () => useContext(themeContext);
