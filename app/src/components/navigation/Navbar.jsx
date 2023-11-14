import './Navbar.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <header>
      <nav className='navbar'>
        <p className='navbar-brand'>Postery</p>
        <ul className='navbar-menu'>
          <li>
            <Link to='/'>{t('nav_home')}</Link>
          </li>
          <li>
            <Link to='/posts'>{t('nav_posts')}</Link>
          </li>
        </ul>
        <div className='navbar-options'>
          <DarkModeToggle />
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}