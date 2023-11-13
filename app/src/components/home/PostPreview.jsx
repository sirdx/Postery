export default function PostPreview(props) {
  const { href, title, content, author } = props;

  return (
    <li>
      <a href={href}><h3>{title}</h3></a>
      <p>{content}</p>
    </li>    
  );
}