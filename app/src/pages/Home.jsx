import { useEffect, useState } from 'react';
import PostsPanel from '../components/home/PostsPanel';
import '../styles/PageHome.scss';
import { useTranslation } from 'react-i18next';
import { getRecentActiveUsers } from '../api/User';
import Header from '../components/common/Header';

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
        <Header title='home_title' />
        <div className='content'>
          <PostsPanel category='home_newest_posts' posts={newestPosts} />
          <PostsPanel category='home_best_posts' posts={bestPosts} />
        </div>
      </main>
    </div>
  );
}