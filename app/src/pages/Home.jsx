import PostsPanel from '../components/home/PostsPanel';
import '../styles/home.scss';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <div className='home'>
      <aside>
        <h2>{t('home_users')}</h2>
      </aside>
      <main>
        <div className='header'>
          <div className='header-bar'></div>
          <h1>{t('nav_home')}</h1>
        </div>
        <div className='content'>
          <PostsPanel category='home_category' posts={[{href: 'test', title: 'Test', content: 'Opis'}]} />
          <PostsPanel category='home_category' posts={[{href: 'test', title: 'Test', content: 'Opis'}]} />
          <PostsPanel category='home_category' posts={[{href: 'test', title: 'Test', content: 'Opis'}]} />
        </div>
      </main>
    </div>
  );
}