import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import styles from './Posts.module.scss';
import { searchPosts } from 'src/api/Post';
import PostFeed from 'src/components/templates/PostFeed';

export default function Posts() {
  const { t } = useTranslation();
  const location = useLocation();

  const searchQuery = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('query')
  }, [location]);
  
  return (
    <>
      <div className={styles.header}>
        <h1>{t('posts_search_results')}</h1>
      </div>
      <PostFeed
        key={searchQuery} 
        fetchPosts={async (page) => await searchPosts(searchQuery, page)} 
        pageSize={10} 
      />
    </>
  );
}