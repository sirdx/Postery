import './MainLayout.scss';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';
import { useEffect, useState } from 'react';
import Sidebar from '../sidebar/SideBar';

export default function MainLayout() {
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
      setUserName(userData.name);
      setUserDisplayName(userData.displayName);
      setUserProfileColor(userData.profileColor);
    };

    fetchData();
  }, [userId]);

  const handleCreatePost = () => {

  };

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
              Create Post
            </button>
          </Link>
        }
      </aside>
      <main id='main'>
        <Outlet />
      </main>
      <aside className='home-right'>
        <div className='users-list'>
          <span className='title'>Users</span>
          
        </div>
      </aside>
    </div>
  );
}