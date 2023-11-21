import './PostPreview.scss';

export default function PostPreview({ post }) {
  return (
    <li className='posts-panel-item'>
      <a href={post.href}><h3>{post.title}</h3></a>
      <p>{post.content}</p>
    </li>
  );
}