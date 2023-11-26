import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TbMoon, TbSun } from 'react-icons/tb';
import styles  from './DarkModeToggle.module.scss';
import ThemeContext from 'src/utils/context/ThemeContext';

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
      className={`${styles.darkModeToggle} ${theme}`}
    >
      {theme === 'dark' && <TbSun /> }
      {theme === 'light' && <TbMoon /> }
    </button>
  );
}