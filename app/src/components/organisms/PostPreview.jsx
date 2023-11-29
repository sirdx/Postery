import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './PostPreview.module.scss';
import { deletePost } from 'src/api/Post';
import PostHeader from 'src/components/molecules/PostHeader';

export default function PostPreview({ post }) {
  const { t } = useTranslation();
  const [isDeleted, setIsDeleted] = useState(false);

  const postUrl = `/post/${post.slug}`;

  const handleOnDelete = async () => {
    const response = await deletePost(post.id);

    if (response.errorDetails === null) {
      setIsDeleted(true);
    }
  };

  return (
    <li className={styles.postPreview}>
      {!isDeleted &&
      <> 
        <PostHeader post={post} onDelete={handleOnDelete} />
        <div className={styles.post}>
          <Link to={postUrl}><h3>{post.title}</h3></Link>
          <p>{post.content}</p>
        </div>
        <div className={styles.stats}>
          <Link to={postUrl}>
            <p>
              {t('post_preview_comments', { count: '296' })}
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