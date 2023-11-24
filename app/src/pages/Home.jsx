import 'src/styles/PageHome.scss';
import { useEffect, useState } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getNewestPosts } from 'src/api/Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostPreview from 'src/components/home/PostPreview';

export default function Home() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [quickPostContent, setQuickPostContent] = useState('');

  const userData = useRouteLoaderData('root').data;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);

    const response = await getNewestPosts(page);

    if (response.data === null) {
      setError(response.errorDetails.message);
    } else {
      setPosts(prevPosts => [...prevPosts, ...response.data]);
      setPage(prevPage => prevPage + 1);
    }

    setIsLoading(false);
  };
  
  return (
    <div className='home'>
      {userData !== null && 
        <div className='quick-post'>
          <div className='avatar' style={{ backgroundColor: `#${userData.profileColor}` }}></div>
          <input 
            type='text'
            placeholder={t('home_quick_post_placeholder')}
            value={quickPostContent}
            onChange={(e) => setQuickPostContent(e.target.value)}
          />
          <Link to={`/new-post/${quickPostContent.trim()}`}>
            <button className='submit'>{t('home_quick_post_submit')}</button>
          </Link>
        </div>
      }
      <div className='feed'>
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={true}
          loader={<p>Loading...</p>}
          scrollableTarget='main'
          endMessage={<p>No more data to load.</p>}
        >
          <ul>
            {posts.map(post => (
              <PostPreview post={post} />
            ))}
          </ul>
        </InfiniteScroll>
        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
}