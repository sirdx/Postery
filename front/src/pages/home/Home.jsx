import { useState } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Home.module.scss';
import { getNewestPosts } from 'src/api/Post';
import PostFeed from 'src/components/templates/PostFeed';
import Avatar from 'src/components/atoms/Avatar';

export default function Home() {
  const { t } = useTranslation();
  const [quickPostContent, setQuickPostContent] = useState('');

  const userData = useRouteLoaderData('root').data;
  
  return (
    <div className={styles.home}>
      {userData !== null && 
        <div className={styles.quickPost}>
          <span className={styles.avatar}>
            <Avatar color={userData.profileColor} />
          </span>
          <input 
            type='text'
            placeholder={t('home_quick_post_placeholder')}
            value={quickPostContent}
            onChange={(e) => setQuickPostContent(e.target.value)}
          />
          <Link to={`/new-post/${quickPostContent.trim()}`}>
            <button>{t('home_quick_post_submit')}</button>
          </Link>
        </div>
      }
      <div className={styles.feed}>
        <PostFeed 
          fetchPosts={async (page) => await getNewestPosts(page)} 
          pageSize={5} 
        />
      </div>
    </div>
  );
}