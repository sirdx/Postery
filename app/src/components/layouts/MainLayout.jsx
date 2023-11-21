import './MainLayout.scss';
import { Outlet } from 'react-router-dom';
import AppBar from '../appbar/AppBar';
import { Link } from 'react-router-dom';
import SideBarTab from './SideBarTab';

export default function MainLayout() {
  const handleCreatePost = () => {

  };

  return (
    <div className='layout'>
      <AppBar />
      <div className='layout-content'>
        <aside className='home-left'>
          <div className='user-badge'>
            <div className='avatar'></div>
            <div className='names'>
              <span className='display-name'>New User</span>
              <span className='username'>newuser</span>
            </div>
          </div>
          <nav className='sidebar'>
            <SideBarTab to='/' name='nav_home' />
            <SideBarTab to='/posts' name='nav_posts' />
          </nav>
          <button 
            className='create-post'
            onClick={handleCreatePost}
          >
            Create Post
          </button>
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