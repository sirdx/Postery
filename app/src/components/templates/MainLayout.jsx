import { Link, Outlet, useRouteLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './MainLayout.scss';
import Sidebar from 'src/components/organisms/Sidebar';

export default function MainLayout() {
  const { t } = useTranslation();
  const userData = useRouteLoaderData('root').data;

  return (
    <div className='main-layout'>
      <aside className='home-left'>
        {userData !== null &&
          <div className='user-badge'>
            <div className='avatar' style={{ backgroundColor: `#${userData.profileColor}` }}></div>
            <div className='names'>
              <span className='display-name'>{userData.displayName}</span>
              <span className='username'>{userData.name}</span>
            </div>
          </div>
        }    
        <Sidebar />
        {userData !== null &&
          <Link to='/new-post'>
            <button className='create-post'>
              {t('main_layout_create_post')}
            </button>
          </Link>
        }
      </aside>
      <main id='main'>
        <Outlet />
      </main>
      <aside className='home-right'>
        <div className='users-list'>
          <span className='title'>
            {t('main_layout_users')}
          </span>
        </div>
      </aside>
    </div>
  );
}