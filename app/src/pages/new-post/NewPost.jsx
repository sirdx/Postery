import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './NewPost.module.scss';
import { createPost } from 'src/api/Post';

const schema = yup.object({
  title: yup.string().required().min(8).max(255),
  content: yup.string().required().min(8).max(1000)
}).required();

export default function NewPost() {
  const { t } = useTranslation();
  const { content } = useParams();
  const navigate = useNavigate();
  const [posting, setPosting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      content: content
    }
  });

  const onSubmit = async data => {
    setApiError(null);
    setPosting(true);
    const response = await createPost(
      data.title,
      data.content
    );
    setPosting(false);

    if (response.errorDetails === null) {
      navigate(`/post/${response.data.slug}`, { replace: true });
    } else {
      setApiError(response.errorDetails.message);
    }
  };

  return (
    <div className={styles.newPostPage}>
      <div className={styles.newPostForm}>
        <div>
          <h1>{t('new_post_header')}</h1>
        </div>
        <form 
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.formBlock}>
            <input 
              type='text'
              placeholder={t('new_post_title_placeholder')}
              className={errors.title && 'error'}
              {...register('title')}
            />
            <p className={styles.errorMessage}>{errors.title?.message}</p>
          </div>
          <div className={`${styles.formBlock} ${styles.content}`}>
            <textarea 
              type='text'
              placeholder={t('new_post_content_placeholder')}
              className={errors.content && 'error'}
              {...register('content')}
            />
            <p className={styles.errorMessage}>{errors.content?.message}</p>
          </div>
          <p className={styles.errorMessage}>{apiError}</p>
          <input 
            type='submit'
            className={styles.create}
            value={t('new_post_submit')}
            disabled={posting}
          />
        </form>     
      </div>
    </div>
  );
}