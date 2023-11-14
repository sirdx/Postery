import { useTranslation } from 'react-i18next';
import PostPreview from './PostPreview';
import Header from 'src/components/common/Header';
import './PostsPanel.scss';

export default function PostsPanel({ category, posts }) {
  const { t } = useTranslation();

  return (
    <article className='posts-panel'>
      <Header title={category} type={2} />
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