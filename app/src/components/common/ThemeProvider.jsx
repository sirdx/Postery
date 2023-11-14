import { useLocalStorage } from "../../hooks/useLocalStorage";
import ThemeContext, { initialThemeState } from "../../contexts/ThemeContext";

export default function ThemeProvider({ children }) {
  const THEME_KEY = 'theme';
  const [theme, setTheme] = useLocalStorage(THEME_KEY, initialThemeState.theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};