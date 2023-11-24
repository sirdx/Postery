import './Layout.scss';
import { Outlet } from 'react-router-dom';
import AppBar from '../appbar/AppBar';

export default function Layout() {
  return (
    <div className='layout'>
      <AppBar />
      <Outlet />
    </div>
  );
}