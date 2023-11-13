import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t, i18n } = useTranslation();

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
        <LanguageSwitcher />
      </nav>
    </header>
  );
}