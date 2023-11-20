import './MainLayout.scss';
import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';

export default function MainLayout() {
  return (
    <div className='layout'>
      <Navbar />
      <div className='layout-outlet'>
        <Outlet />
      </div>
    </div>
  );
}