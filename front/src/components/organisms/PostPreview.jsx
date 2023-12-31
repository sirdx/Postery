import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './PostPreview.module.scss';
import { deletePost } from 'src/api/Post';
import PostHeader from 'src/components/molecules/PostHeader';

export default function PostPreview({ post }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);

  const postUrl = `/post/${post.slug}`;

  const handleOnDelete = async () => {
    const response = await deletePost(post.id);

    if (response.errorDetails === null) {
      setIsDeleted(true);
    }
  };

  const handleOnEdit = () => {
    navigate(`/edit-post/${post.slug}`, { replace: true });
  };

  return (
    <li className={styles.postPreview}>
      {!isDeleted &&
      <> 
        <PostHeader post={post} onEdit={handleOnEdit} onDelete={handleOnDelete} />
        <div className={styles.post}>
          <Link to={postUrl}><h3>{post.title}</h3></Link>
          <p>{post.content}</p>
        </div>
        <div className={styles.stats}>
          <Link to={postUrl}>
            <p>
              {t('post_preview_comments', { count: post.commentsCount })}
            </p>
          </Link>
        </div>
      </>
      }
      {isDeleted &&
      <>
        <PostHeader post={{ ...post, id: -1 }} />
        <div className={styles.post}>
          <h3>{t('post_preview_deleted')}</h3>
          <p>{t('post_preview_deleted_content')}</p>
        </div>
      </>
      }
    </li>
  );
}