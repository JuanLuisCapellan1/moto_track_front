import { useState, createContext, useContext, useEffect } from "react";
import { ConfigProvider } from "antd";
import esES from 'antd/lib/locale/es_ES';
import enUS from 'antd/lib/locale/en_US';
import { useAuth } from './AuthContext';

const DEFAULT_LANGUAGE = "es";
const LANGUAGE_STORAGE_KEY = "mototrack_user_language";

const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  changeLanguage: () => {},
});

export const LanguageProvider = ({ children }) => {
  const { currentUser } = useAuth() || { currentUser: null };
  const userId = currentUser?.id || 'guest';
  
  // Get stored language for current user
  const getStoredLanguage = () => {
    try {
      const storedLanguages = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (storedLanguages) {
        const languageData = JSON.parse(storedLanguages);
        return languageData[userId] || DEFAULT_LANGUAGE;
      }
    } catch (error) {
      console.error("Error retrieving stored language:", error);
    }
    return DEFAULT_LANGUAGE;
  };

  const [language, setLanguageState] = useState(() => getStoredLanguage());
  
  // Store language whenever it changes
  const setLanguage = (lang) => {
    const newLanguage = typeof lang === 'function' ? lang(language) : lang;
    setLanguageState(newLanguage);
    
    try {
      const storedLanguages = JSON.parse(localStorage.getItem(LANGUAGE_STORAGE_KEY) || '{}');
      storedLanguages[userId] = newLanguage;
      localStorage.setItem(LANGUAGE_STORAGE_KEY, JSON.stringify(storedLanguages));
    } catch (error) {
      console.error("Error storing language preference:", error);
    }
  };

  const changeLanguage = () => {
    setLanguage(prevLanguage => prevLanguage === 'es' ? 'en' : 'es');
  };

  // Update language when user changes
  useEffect(() => {
    setLanguageState(getStoredLanguage());
  }, [userId]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      <ConfigProvider locale={language === 'es' ? esES : enUS}>
        {children}
      </ConfigProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);