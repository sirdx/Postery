import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TbLineDashed, TbTrash } from 'react-icons/tb';
import { formatDistance } from 'date-fns';
import { enUS } from 'date-fns/locale';
import styles from './PostPreview.module.scss';
import { useAuth } from 'src/utils/hooks/useAuth';
import { deletePost } from 'src/api/Post';
import Avatar from '../atoms/Avatar';

export default function PostPreview({ post }) {
  const options = useRef(null);
  const { t } = useTranslation();
  const { userId } = useAuth();
  const [optionsOpen, setOptionsOpen] = useState(false);

  const createdAt = Date.parse(post.createdAt);
  const postUrl = `/post/${post.slug}`;

  const handleOpenOptions = () => {
    setOptionsOpen(!optionsOpen);
  }

  const handleClickOutside = (event) => {
    if (options.current && !options.current.contains(event.target)) {
      setOptionsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = async () => {
    const response = await deletePost(post.id);

    if (response.errorDetails === null) {
      location.reload(); // FIXME: This is bad.
    }
  };

  return (
    <li className={styles.postPreview}>
      <div className={styles.header}>
        <span className={styles.avatar}>
          <Avatar color={post.authorProfileColor} />
        </span>
        <div className={styles.info}>
          <h4>{post.authorDisplayName}</h4>
          <span>{formatDistance(createdAt, new Date(), { addSuffix: true, locale: enUS })}</span>
        </div>
        <div className={styles.options} ref={options}>
          <button className={styles.openOptions} onClick={handleOpenOptions}>
            <TbLineDashed />
          </button>
          {optionsOpen &&
            <ul className={styles.menu}>
              {userId === post.authorId &&
                <li>
                  <button onClick={handleDelete}><TbTrash />Delete</button>
                </li>
              }
              <li>
                <button><TbTrash />Sample</button>
              </li>
            </ul>
          }
        </div>
      </div>
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
    </li>
  );
}