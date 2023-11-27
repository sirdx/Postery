import styles from './Avatar.module.scss';

export default function Avatar({ color }) {
  return (
    <div className={styles.avatar} style={{ backgroundColor: `#${color}` }}></div>
  );
}