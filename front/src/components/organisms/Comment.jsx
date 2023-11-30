import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Comment.module.scss';
import PostHeader from 'src/components/molecules/PostHeader';
import { deleteComment } from 'src/api/Comment';

export default function Comment({ comment }) {
  const { t } = useTranslation();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleOnDelete = async () => {
    const response = await deleteComment(comment.id);

    if (response.errorDetails === null) {
      setIsDeleted(true);
    }
  };

  return (
    <li className={styles.comment}>
      {!isDeleted &&
      <> 
        <PostHeader post={comment} onDelete={handleOnDelete} />
        <div className={styles.content}>
          <p>{comment.content}</p>
        </div>
      </>
      }
      {isDeleted &&
      <>
        <PostHeader post={{ ...comment, id: -1 }} />
        <div className={styles.content}>
          <p>{t('post_preview_deleted_content')}</p>
        </div>
      </>
      }
    </li>
  );
}