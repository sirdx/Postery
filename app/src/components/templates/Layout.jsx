import { Outlet } from 'react-router-dom';
import './Layout.scss';
import AppBar from 'src/components/organisms/AppBar';

export default function Layout() {
  return (
    <div className='layout'>
      <AppBar />
      <Outlet />
    </div>
  );
}