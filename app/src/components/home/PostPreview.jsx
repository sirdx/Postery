import './PostPreview.scss';
import { formatDistance } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { TbLineDashed } from 'react-icons/tb';
import { Link } from 'react-router-dom';

export default function PostPreview({ post }) {
  const createdAt = Date.parse(post.createdAt);
  const postUrl = `/post/${post.id}`;

  return (
    <li className='post-preview'>
      <div className='header'>
        <div className='avatar' style={{ backgroundColor: `#${post.authorProfileColor}` }}></div>
        <div className='info'>
          <h4>{post.authorDisplayName}</h4>
          <span>{formatDistance(createdAt, new Date(), { addSuffix: true, locale: enUS })}</span>
        </div>
        <div className='options'>
          <button>
            <TbLineDashed />
          </button>
        </div>
      </div>
      <div className='post'>
        <Link to={postUrl}><h3>{post.title}</h3></Link>
        <p>{post.content}</p>
      </div>
      <div className='stats'>
        <Link to={postUrl}><p>View 296 comments</p></Link>
      </div>
    </li>
  );
}