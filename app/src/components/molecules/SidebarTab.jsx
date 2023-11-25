import './SidebarTab.scss';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export default function SidebarTab({ to, name, icon }) {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <Link to={to}>
      <div className={`tab ${location.pathname === to ? 'active' : ''}`}>
        <div className='content'>
          <span className='icon'>{icon}</span>
          <span className='link'>{t(name)}</span>
        </div>
      </div>
    </Link>
  );
}