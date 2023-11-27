import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './PostFeed.module.scss';
import PostPreview from 'src/components/organisms/PostPreview';
import PostPreviewPlaceholder from '../organisms/PostPreviewPlaceholder';

export default function PostFeed({ fetchPosts, pageSize }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    handleNext();
  }, []);

  const handleNext = async () => {
    setIsLoading(true);
    setError(null);
    
    const response = await fetchPosts(page);

    if (response.errorDetails === null) {
      const fetchedPosts = response.data;
      setHasMore(fetchedPosts.length >= pageSize);
      setPosts(prevPosts => [...prevPosts, ...fetchedPosts]);
      setPage(prevPage => prevPage + 1);
    } else {
      setError(response.errorDetails.message);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.feed}>
      <InfiniteScroll
        dataLength={posts.length}
        next={handleNext}
        hasMore={hasMore}
        loader={
          <ul>
            <PostPreviewPlaceholder />
            <PostPreviewPlaceholder />
          </ul>
        }
        scrollableTarget='main'
        endMessage={<p>No more data to load.</p>}
      >
        <ul>
          {posts.map(post => (
            <PostPreview key={post.id} post={post} />
          ))}
        </ul>
      </InfiniteScroll>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}