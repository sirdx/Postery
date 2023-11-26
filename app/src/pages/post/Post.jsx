import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { TbLineDashed } from 'react-icons/tb';
import styles from './Post.module.scss';
import { getPost } from 'src/api/Post';

export default function Post() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    setIsLoading(true);
    setError(null);

    const response = await getPost(id);

    if (response.errorDetails === null) {
      setPost(response.data);
    } else {
      setError(response.errorDetails.message);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.postPage}>
      {post !== null && 
      <>
        <div className={styles.post}>
          <div className={styles.header}>
            <div className={styles.avatar} style={{ backgroundColor: `#${post.authorProfileColor}` }}></div>
            <div className={styles.info}>
              <h4>{post.authorDisplayName}</h4>
              <span>{formatDistance(Date.parse(post.createdAt), new Date(), { addSuffix: true, locale: enUS })}</span>
            </div>
            <div className={styles.options}>
              <button>
                <TbLineDashed />
              </button>
            </div>
          </div>
          <div className={styles.postContent}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
          <div className={styles.stats}>
          </div>
        </div>
        <div className={styles.comments}>
          <p>Comments...</p>
        </div>
      </>}
    </div>
  );
}