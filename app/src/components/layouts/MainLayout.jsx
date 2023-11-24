import './MainLayout.scss';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';
import { useEffect, useState } from 'react';
import Sidebar from '../sidebar/SideBar';
import { useTranslation } from 'react-i18next';

export default function MainLayout() {
  const { t } = useTranslation();
  const { userId, onUserData } = useAuth();
  const [userName, setUserName] = useState('');
  const [userDisplayName, setUserDisplayName] = useState('');
  const [userProfileColor, setUserProfileColor] = useState('#ffffff');

  useEffect(() => {
    const fetchData = async () => {
      if (userId === null) {
        return;
      }

      const userData = await onUserData();
      const data = userData.data;

      if (data === null) {
        return;
      }

      setUserName(data.name);
      setUserDisplayName(data.displayName);
      setUserProfileColor(data.profileColor);
    };

    fetchData();
  }, [userId]);

  return (
    <div className='main-layout'>
      <aside className='home-left'>
        {userId !== null &&
          <div className='user-badge'>
            <div className='avatar' style={{ backgroundColor: `#${userProfileColor}` }}></div>
            <div className='names'>
              <span className='display-name'>{userDisplayName}</span>
              <span className='username'>{userName}</span>
            </div>
          </div>
        }    
        <Sidebar />
        {userId !== null &&
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