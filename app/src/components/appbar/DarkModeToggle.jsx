import { useContext } from 'react';
import './DarkModeToggle.scss';
import ThemeContext from 'src/contexts/ThemeContext';
import { TbMoon, TbSun } from 'react-icons/tb';

export default function DarkModeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      title='Toggle dark mode' 
      onClick={toggleTheme}
      className={`dark-mode-toggle ${theme}`}
    >
      {theme === 'dark' && <TbSun /> }
      {theme === 'light' && <TbMoon /> }
    </button>
  );
}