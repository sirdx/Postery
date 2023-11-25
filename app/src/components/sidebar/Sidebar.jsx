import './Sidebar.scss';
import SidebarTab from 'src/components/sidebar/SidebarTab';
import { TbHome } from 'react-icons/tb';

export default function Sidebar() {
  return (
    <nav className='sidebar'>
      <SidebarTab to='/' name='nav_home'>
        <TbHome />
      </SidebarTab>
    </nav>
  );
}