import { createContext } from 'react';

export const initialThemeState = {
  theme: 'dark',
  setTheme: () => null
};

const ThemeContext = createContext(initialThemeState);
export default ThemeContext;