import 'src/styles/PageHome.scss';
import { useEffect, useState } from 'react';
import { useAuth } from 'src/hooks/useAuth';
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

  const { userId, onUserData } = useAuth();
  const [userProfileColor, setUserProfileColor] = useState('#ffffff');

  useEffect(() => {
    const fetchData = async () => {
      if (userId === null) {
        return;
      }

      const userData = await onUserData();
      setUserProfileColor(userData.profileColor);
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getNewestPosts(page);

      setPosts(prevPosts => [...prevPosts, ...data]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className='home'>
      <div className='quick-post'>
        <div className='avatar' style={{ backgroundColor: `#${userProfileColor}` }}></div>
        <input 
          type='text'
          placeholder='Write a quick post...'
        />
        <button className='submit'>Post</button>
      </div>
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