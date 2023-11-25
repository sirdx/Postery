import { Outlet } from 'react-router-dom';
import './Layout.scss';
import Header from 'src/components/organisms/Header';

export default function Layout() {
  return (
    <div className='layout'>
      <Header />
      <Outlet />
    </div>
  );
}