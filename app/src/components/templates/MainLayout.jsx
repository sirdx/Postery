import { Link, Outlet, useRouteLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './MainLayout.module.scss';
import Sidebar from 'src/components/organisms/Sidebar';
import Avatar from 'src/components/atoms/Avatar';

export default function MainLayout() {
  const { t } = useTranslation();
  const userData = useRouteLoaderData('root').data;

  return (
    <div className={styles.mainLayout}>
      <aside className={styles.homeLeft}>
        {userData !== null &&
          <div className={styles.userBadge}>
            <span className={styles.avatar}>
              <Avatar color={userData.profileColor} />
            </span>
            <div className={styles.names}>
              <span className={styles.displayName}>{userData.displayName}</span>
              <span className={styles.username}>{userData.name}</span>
            </div>
          </div>
        }    
        <Sidebar />
        {userData !== null &&
          <Link to='/new-post'>
            <button className={styles.createPost}>
              {t('main_layout_create_post')}
            </button>
          </Link>
        }
      </aside>
      <main id='main'>
        <Outlet />
      </main>
      <aside className={styles.homeRight}>
        <div className={styles.usersList}>
          <span className={styles.title}>
            {t('main_layout_users')}
          </span>
        </div>
      </aside>
    </div>
  );
}