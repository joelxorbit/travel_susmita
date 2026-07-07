import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const root = document.documentElement;
      root.classList.remove('dark');
      localStorage.setItem('wanderluxe_theme', 'light');
    } catch (e) {}
  }, [isDark]);

  const toggleTheme = () => {
    // Keep it in clean white mode
    setIsDark(false);
  };

  return (
    <ThemeContext.Provider value={{ isDark: false, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
