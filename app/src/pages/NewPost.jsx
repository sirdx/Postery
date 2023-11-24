import 'src/styles/PageNewPost.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { createPost } from 'src/api/Post';
import { useTranslation } from 'react-i18next';

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

    if (response.id !== undefined) {
      navigate(`/post/${response.id}`, { replace: true });
    } else {
      setApiError(response);
    }
  };

  return (
    <div className='new-post-page'>
      <div className='new-post-form'>
        <div>
          <h1>{t('new_post_header')}</h1>
        </div>
        <form 
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='form-block'>
            <input 
              type='text'
              placeholder={t('new_post_title_placeholder')}
              className={errors.title && 'error'}
              {...register('title')}
            />
            <p className='error-message'>{errors.title?.message}</p>
          </div>
          <div className='form-block content'>
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
            className='create'
            value={t('new_post_submit')}
            disabled={posting}
          />
        </form>     
      </div>
    </div>
  );
}