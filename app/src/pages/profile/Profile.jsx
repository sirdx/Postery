import { useMemo, useState } from 'react';
import { Navigate, defer, useLoaderData } from 'react-router-dom';
import styles from './Profile.module.scss';
import { getUser } from 'src/api/User';
import Avatar from 'src/components/atoms/Avatar';
import { useTranslation } from 'react-i18next';
import PostFeed from 'src/components/templates/PostFeed';
import { getUserPosts } from 'src/api/Post';

export async function profileLoader({ params }) {
  const userResponse = await getUser(params.id);
  return defer({ userResponse });
}

export default function Profile() {
  const { t } = useTranslation();
  const { userResponse } = useLoaderData();
  const [error, setError] = useState(null);

  const user = useMemo(() => {
    if (userResponse.errorDetails === null) {
      return userResponse.data;
    } else {
      setError(userResponse.errorDetails.message);
      return null;
    }
  }, [userResponse]);

  const createdAt = new Date(user.createdAt);

  return (
    <>
      <div className={styles.profile}>
        <span className={styles.avatar}>
          <Avatar color={user.profileColor} id={user.id} />
        </span>
        <div className={styles.info}>
          <div className={styles.header}>
            <h1>{user.displayName}</h1>
            <h3>@{user.name}</h3>
          </div>
          <p>{t('profile_created', { date: createdAt })}</p>
        </div>
      </div>
      <PostFeed
        fetchPosts={async (page) => await getUserPosts(user.id, page)} 
        pageSize={5} 
      />
    </>
  );
}