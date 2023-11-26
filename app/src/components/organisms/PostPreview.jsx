import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TbLineDashed } from 'react-icons/tb';
import { formatDistance } from 'date-fns';
import { enUS } from 'date-fns/locale';
import styles from './PostPreview.module.scss';

export default function PostPreview({ post }) {
  const { t } = useTranslation();
  const createdAt = Date.parse(post.createdAt);
  const postUrl = `/post/${post.slug}`;

  return (
    <li className={styles.postPreview}>
      <div className={styles.header}>
        <div className={styles.avatar} style={{ backgroundColor: `#${post.authorProfileColor}` }}></div>
        <div className={styles.info}>
          <h4>{post.authorDisplayName}</h4>
          <span>{formatDistance(createdAt, new Date(), { addSuffix: true, locale: enUS })}</span>
        </div>
        <div className={styles.options}>
          <button>
            <TbLineDashed />
          </button>
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