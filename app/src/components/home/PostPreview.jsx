import './PostPreview.scss';

export default function PostPreview({ href, title, content, author }) {
  return (
    <li className='posts-panel-item'>
      <a href={href}><h3>{title}</h3></a>
      <p>{content}</p>
    </li>
  );
}