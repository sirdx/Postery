import { useEffect, useState } from 'react';
import PostsPanel from '../components/home/PostsPanel';
import '../styles/home.scss';
import { useTranslation } from 'react-i18next';
import { getRecentActiveUsers } from '../api/User';

export default function Home() {
  const { t } = useTranslation();
  const [recentActiveUsers, setRecentActiveUsers] = useState([]);
  const [newestPosts, setNewestPosts] = useState([]);
  const [bestPosts, setBestPosts] = useState([]);

  useEffect(() => {
    // TODO: Fetch posts
    
    const interval = setInterval(() => {
      async function fetchRecentActiveUsers() {
        const response = await getRecentActiveUsers();
        setRecentActiveUsers(response);
      }

      fetchRecentActiveUsers();
    }, 10 * 1000);

    return () => clearInterval(interval)
  }, []);
  
  return (
    <div className='home'>
      <aside>
        <h2>{t('home_users')}</h2>
      </aside>
      <main>
        <div className='header'>
          <div className='header-bar'></div>
          <h1>{t('home_title')}</h1>
        </div>
        <div className='content'>
          <PostsPanel category='home_newest_posts' posts={newestPosts} />
          <PostsPanel category='home_best_posts' posts={bestPosts} />
        </div>
      </main>
    </div>
  );
}