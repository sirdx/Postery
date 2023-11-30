import { useMemo, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { TbArrowBack } from 'react-icons/tb';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './EditPost.module.scss';
import { updatePost } from 'src/api/Post';

export default function EditPost() {
  const { t } = useTranslation();
  const { postResponse } = useLoaderData();
  const navigate = useNavigate();
  const [posting, setPosting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const post = useMemo(() => {
    if (postResponse.errorDetails === null) {
      return postResponse.data;
    } else {
      setError(postResponse.errorDetails.message);
      return null;
    }
  }, [postResponse]);

  const schema = useMemo(() => yup.object({
      title: yup.string()
        .required(t('field_required'))
        .min(8, t('edit_post_title_min'))
        .max(255, t('edit_post_title_max')),
      content: yup.string()
        .required(t('field_required'))
        .min(8, t('edit_post_content_min'))
        .max(1000, t('edit_post_content_max'))
    }).required(),
  []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: post.title,
      content: post.content
    }
  });

  const onSubmit = async data => {
    setApiError(null);
    setPosting(true);
    const response = await updatePost(
      post.id,
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
        <div className={styles.header}>
          <Link to='/'><TbArrowBack /></Link>
          <h1>{t('edit_post_header')}</h1>
        </div>
        <form 
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.formBlock}>
            <input 
              type='text'
              placeholder={t('edit_post_title_placeholder')}
              className={errors.title && 'error'}
              {...register('title')}
            />
            <p className='error-message'>{errors.title?.message}</p>
          </div>
          <div className={`${styles.formBlock} ${styles.content}`}>
            <textarea 
              type='text'
              placeholder={t('edit_post_content_placeholder')}
              className={errors.content && 'error'}
              {...register('content')}
            />
            <p className='error-message'>{errors.content?.message}</p>
          </div>
          <p className='error-message'>{apiError}</p>
          <input 
            type='submit'
            className={styles.create}
            value={t('edit_post_submit')}
            disabled={posting}
          />
        </form>     
      </div>
    </div>
  );
}