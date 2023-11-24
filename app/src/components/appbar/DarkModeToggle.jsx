import { useContext } from 'react';
import './DarkModeToggle.scss';
import ThemeContext from 'src/contexts/ThemeContext';
import { TbMoon, TbSun } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';

export default function DarkModeToggle() {
  const { t } = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      title={t('dark_mode_toggle_title')}
      onClick={toggleTheme}
      className={`dark-mode-toggle ${theme}`}
    >
      {theme === 'dark' && <TbSun /> }
      {theme === 'light' && <TbMoon /> }
    </button>
  );
}