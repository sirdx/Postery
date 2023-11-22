import { useEffect, useState } from 'react';
import { searchPosts } from 'src/api/Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostPreview from 'src/components/home/PostPreview';
import { useLocation } from 'react-router-dom';

export default function Posts() {
  const location = useLocation();

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('query');

    fetchPosts(searchQuery, 0, []);
  }, [location]);

  const fetchPosts = async (query, page, prevPosts) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await searchPosts(query, page);

      setPosts([...prevPosts, ...data]);
      setPage(page + 1);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNextPosts = async () => {
    await fetchPosts(searchQuery, page, posts);
  };

  return (
    <>
      <h1>Posts</h1>

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchNextPosts}
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
    </>
  );
}