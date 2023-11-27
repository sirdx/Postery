import styles from './PostPreviewPlaceholder.module.scss';

export default function PostPreviewPlaceholder() {
  return (
    <li className={styles.postPreview}>
      <div className={styles.header}>
        <div className={styles.avatar}></div>
        <div className={styles.info}></div>
      </div>
      <div className={styles.post}></div>
      <div className={styles.stats}></div>
    </li>
  );
}