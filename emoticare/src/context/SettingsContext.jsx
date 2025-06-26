// context/SettingsContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const SettingsContext = createContext();

const getStored = (key, defaultVal) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultVal;
};

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(getStored('theme', 'light'));
  const [fontSize, setFontSize] = useState(getStored('fontSize', 'medium'));
  const [language, setLanguage] = useState(getStored('language', 'Eng'));
  const [volume, setVolume] = useState(getStored('volume', 40));
  const [highRes, setHighRes] = useState(getStored('highRes', true));

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    localStorage.setItem('fontSize', JSON.stringify(fontSize));
    localStorage.setItem('language', JSON.stringify(language));
    localStorage.setItem('volume', JSON.stringify(volume));
    localStorage.setItem('highRes', JSON.stringify(highRes));

    // Apply theme to body or root div
    document.body.className = `theme-${theme} global-font-${fontSize}`;
  }, [theme, fontSize, language, volume, highRes]);

  return (
    <SettingsContext.Provider
      value={{
        theme, setTheme,
        fontSize, setFontSize,
        language, setLanguage,
        volume, setVolume,
        highRes, setHighRes
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
