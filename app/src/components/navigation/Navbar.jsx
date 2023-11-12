import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { t, i18n } = useTranslation();

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>{t('nav_home')}</Link>
        </li>
        <li>
          <Link to='/posts'>{t('nav_posts')}</Link>
        </li>
      </ul>
    </nav>
  );
}