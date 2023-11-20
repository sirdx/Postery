import { useEffect, useState } from 'react';
import PostsPanel from 'src/components/home/PostsPanel';
import 'src/styles/PageHome.scss';
import { useTranslation } from 'react-i18next';
import { getRecentActiveUsers } from 'src/api/User';
import Header from 'src/components/common/Header';
import { getPosts } from 'src/api/Post';

export default function Home() {
  const { t } = useTranslation();
  const [recentActiveUsers, setRecentActiveUsers] = useState([]);
  const [newestPosts, setNewestPosts] = useState([]);
  const [bestPosts, setBestPosts] = useState([]);

  useEffect(() => {
    async function fetchNewestPosts() {
      const response = await getPosts();
      setNewestPosts(response);
    }

    fetchNewestPosts();
    
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