import { Link } from 'react-router-dom';
import styles from './Avatar.module.scss';

export default function Avatar({ color, id }) {
  return (
    <Link to={`/profile/${id}`}>
      <div className={styles.avatar} style={{ backgroundColor: `#${color}` }}></div>
    </Link>
  );
}