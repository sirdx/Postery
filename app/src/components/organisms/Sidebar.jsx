import { TbHome } from 'react-icons/tb';
import { sidebar } from './Sidebar.module.scss';
import SidebarTab from 'src/components/molecules/SidebarTab';

export default function Sidebar() {
  return (
    <nav className={sidebar}>
      <SidebarTab to='/' name='nav_home' icon={<TbHome />} />
    </nav>
  );
}