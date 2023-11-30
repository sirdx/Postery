import styles from './SidebarTab.module.scss';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export default function SidebarTab({ to, name, icon }) {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <Link to={to} className={`${styles.sidebarTab} ${location.pathname === to ? styles.active : ''}`}>
      <div className={styles.content}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.link}>{t(name)}</span>
      </div>
    </Link>
  );
}