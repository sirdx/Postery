import React from 'react';

export const initialThemeState = {
  theme: 'dark',
  setTheme: () => null
};

const ThemeContext = React.createContext(initialThemeState);
export default ThemeContext;