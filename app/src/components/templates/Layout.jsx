import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import Header from 'src/components/organisms/Header';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
    </div>
  );
}