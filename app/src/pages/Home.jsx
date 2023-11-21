import { useEffect, useState } from 'react';
import PostsPanel from 'src/components/home/PostsPanel';
import 'src/styles/PageHome.scss';
import { useTranslation } from 'react-i18next';
import { getRecentActiveUsers } from 'src/api/User';
import Header from 'src/components/common/Header';
import { getNewestPosts, getPosts } from 'src/api/Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostPreview from 'src/components/home/PostPreview';

export default function Home() {
  const { t } = useTranslation();
  const [recentActiveUsers, setRecentActiveUsers] = useState([]);
  const [newestPosts, setNewestPosts] = useState([]);
  const [bestPosts, setBestPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      //const data = await getNewestPosts(page);
      const data = [{title:'test', content: 'test'},
      {title:'test', content: 'test'},
      {title:'test', content: 'test'},
      {title:'test', content: 'test'},
      {title:'test', content: 'test'},
      {title:'test', content: 'test'}];
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
        <div className='avatar'></div>
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