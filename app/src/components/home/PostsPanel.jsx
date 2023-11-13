import { useTranslation } from 'react-i18next';
import PostPreview from './PostPreview';

export default function PostsPanel(props) {
  const { category, posts } = props;
  const { t } = useTranslation();

  return (
    <article className='posts'>
      <div className='header'>
        <div className='header-bar'></div>
        <h2>{t(category)}</h2>
      </div>
      {posts.length > 0 && 
        <ul>
          {posts.map(post =>
            <PostPreview href={post.href} title={post.title} content={post.content} />  
          )}
        </ul>
      }
      {posts.length === 0 && 
        <p>{t('home_no_posts')}</p>
      }
    </article>
  );
}