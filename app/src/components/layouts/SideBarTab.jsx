import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export default function SideBarTab({ to, name }) {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <Link to={to}>
      <div className='tab' active={location.pathname === to ? 1 : 0}>
        <div className='content'>
          <span className='icon'></span>
          <span className='link'>{t(name)}</span>
        </div>
      </div>
    </Link>
  );
}