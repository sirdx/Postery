import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { defer, useLoaderData, useNavigate } from 'react-router-dom';
import styles from './Post.module.scss';
import { getPost, deletePost } from 'src/api/Post';
import PostHeader from 'src/components/molecules/PostHeader';
import CommentFeed from 'src/components/templates/CommentFeed';
import { useAuth } from 'src/utils/hooks/useAuth';
import NewComment from 'src/components/organisms/NewComment';

export async function postLoader({ params }) {
  const postResponse = await getPost(params.slug);
  return defer({ postResponse });
}

export default function Post() {
  const { t } = useTranslation();
  const { postResponse } = useLoaderData();
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [error, setError] = useState(null);
  const [feedKey, setFeedKey] = useState(false);

  const post = useMemo(() => {
    if (postResponse.errorDetails === null) {
      return postResponse.data;
    } else {
      setError(postResponse.errorDetails.message);
      return null;
    }
  }, [postResponse]);

  const modifiedAt = new Date(post.modifiedAt);

  const handleOnDelete = async () => {
    const response = await deletePost(post.id);

    if (response.errorDetails === null) {
      navigate('/', { replace: true });
    }
  };

  const handleOnEdit = () => {
    navigate(`/edit-post/${post.slug}`, { replace: true });
  };

  const handleNewComment = () => {
    setFeedKey(!feedKey); // FIXME: it works.
  };

  return (
    <div className={styles.postPage}>
      {post !== null && 
      <>
        <div className={styles.post}>
          <PostHeader post={post} onEdit={handleOnEdit} onDelete={handleOnDelete} />
          <div className={styles.postContent}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
          <div className={styles.stats}>
            <p>{t('post_last_modification', { date: modifiedAt })}</p>
          </div>
        </div>
        <div className={styles.comments}>
          {userId != null && <NewComment postId={post.id} onNewComment={handleNewComment} />}
          <CommentFeed key={feedKey} postId={post.id} />
        </div>
      </>}
    </div>
  );
}