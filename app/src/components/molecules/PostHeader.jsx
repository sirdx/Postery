import { useEffect, useRef, useState } from 'react';
import { TbLineDashed, TbTrash } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import { formatDistance } from 'date-fns';
import { enUS } from 'date-fns/locale';
import styles from './PostHeader.module.scss';
import Avatar from 'src/components/atoms/Avatar';
import { useAuth } from 'src/utils/hooks/useAuth';

export default function PostHeader({ post, onDelete }) {
  const { t } = useTranslation();
  const options = useRef(null);
  const { userId } = useAuth();
  const [optionsOpen, setOptionsOpen] = useState(false);

  const createdAt = Date.parse(post.createdAt);

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

  return (
    <div className={styles.header}>
      {post.id !== -1 &&
      <>
        <span className={styles.avatar}>
          <Avatar color={post.authorProfileColor} id={post.authorId} />
        </span>
        <div className={styles.info}>
          <h4>{post.authorDisplayName}</h4>
          <span>{t('post_preview_published', { date: createdAt })}</span>
        </div>
        <div className={styles.options} ref={options}>
          <button className={styles.openOptions} onClick={handleOpenOptions}>
            <TbLineDashed />
          </button>
          {optionsOpen &&
            <ul className={styles.menu}>
              {userId === post.authorId &&
                <li>
                  <button onClick={onDelete}><TbTrash /> Delete</button>
                </li>
              }
              <li>
                {/* Other options */}
              </li>
            </ul>
          }
        </div>
      </>
      }
      {post.id === -1 &&
      <div className={styles.header}>
        <span className={styles.avatar}>
          <Avatar color='000000' />
        </span>
        <div className={styles.info}>
          <h4>### {t('post_preview_deleted')} ###</h4>
        </div>
      </div>
      }
    </div>
  );
}