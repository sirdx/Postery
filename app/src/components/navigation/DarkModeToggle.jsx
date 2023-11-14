import { useContext } from 'react';
import './DarkModeToggle.scss';
import ThemeContext from '../../contexts/ThemeContext';

export default function DarkModeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? <>LM</> : <>DM</>}
    </button>
  );
}