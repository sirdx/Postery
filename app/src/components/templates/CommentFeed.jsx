import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './PostFeed.module.scss';
import PostPreviewPlaceholder from '../organisms/PostPreviewPlaceholder';
import { getComments } from 'src/api/Comment';
import Comment from 'src/components/organisms/Comment';

export default function CommentFeed({ postId }) {
  const [comments, setComments] = useState([]);
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
    
    const response = await getComments(postId, page);

    if (response.errorDetails === null) {
      const fetchedComments = response.data;
      setHasMore(fetchedComments.length >= 10);
      setComments(prevComments => [...prevComments, ...fetchedComments]);
      setPage(prevPage => prevPage + 1);
    } else {
      setError(response.errorDetails.message);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.feed}>
      <InfiniteScroll
        dataLength={comments.length}
        next={handleNext}
        hasMore={hasMore}
        loader={
          <ul>
            <PostPreviewPlaceholder />
          </ul>
        }
        scrollableTarget='main'
        endMessage={<p>No more data to load.</p>}
      >
        <ul>
          {comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      </InfiniteScroll>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}