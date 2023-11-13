import './style.scss';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className='layout'>
      <Navbar />
      <div className='layout-outlet'>
        <Outlet />
      </div>
    </div>
  );
}