import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './NewPost.module.scss';
import { createPost } from 'src/api/Post';
import { TbArrowBack } from 'react-icons/tb';

export default function NewPost() {
  const { t } = useTranslation();
  const { content } = useParams();
  const navigate = useNavigate();
  const [posting, setPosting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const schema = useMemo(() => yup.object({
      title: yup.string()
        .required(t('field_required'))
        .min(8, t('new_post_title_min'))
        .max(255, t('new_post_title_max')),
      content: yup.string()
        .required(t('field_required'))
        .min(8, t('new_post_content_min'))
        .max(1000, t('new_post_content_max'))
    }).required(),
  []);

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
        <div className={styles.header}>
          <Link to='/'><TbArrowBack /></Link>
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
            <p className='error-message'>{errors.title?.message}</p>
          </div>
          <div className={`${styles.formBlock} ${styles.content}`}>
            <textarea 
              type='text'
              placeholder={t('new_post_content_placeholder')}
              className={errors.content && 'error'}
              {...register('content')}
            />
            <p className='error-message'>{errors.content?.message}</p>
          </div>
          <p className='error-message'>{apiError}</p>
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