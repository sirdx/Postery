import { useLocalStorage } from 'src/utils/hooks/useLocalStorage';
import ThemeContext, { initialThemeState } from 'src/utils/context/ThemeContext';

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', initialThemeState.theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};