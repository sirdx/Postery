import './MainLayout.scss';
import { Outlet } from 'react-router-dom';
import AppBar from '../appbar/AppBar';
import { Link } from 'react-router-dom';
import SideBarTab from './SideBarTab';
import { useAuth } from 'src/hooks/useAuth';

export default function MainLayout() {
  const { userId, userName, userDisplayName, userProfileColor } = useAuth();

  const handleCreatePost = () => {

  };

  return (
    <div className='layout'>
      <AppBar />
      <div className='layout-content'>
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
          <nav className='sidebar'>
            <SideBarTab to='/' name='nav_home' />
            <SideBarTab to='/posts' name='nav_posts' />
          </nav>
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
    </div>
  );
}