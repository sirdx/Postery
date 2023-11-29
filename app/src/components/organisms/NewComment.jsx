import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './NewComment.module.scss';
import { createComment } from 'src/api/Comment';

const schema = yup.object({
  content: yup.string().required().max(300)
}).required();

export default function NewComment({ postId, onNewComment }) {
  const { t } = useTranslation();
  const [posting, setPosting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async data => {
    setApiError(null);
    setPosting(true);
    const response = await createComment(
      postId,
      data.content
    );
    setPosting(false);

    if (response.errorDetails === null) {
      reset();
      onNewComment(response.data);
    } else {
      setApiError(response.errorDetails.message);
    }
  };

  return (
    <div className={styles.newComment}>
      <div className={styles.header}>
       <h4>{t('new_comment_header')}</h4>
      </div>
      <form 
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.formBlock}>
          <textarea 
            type='text'
            placeholder={t('new_comment_content_placeholder')}
            className={errors.content && 'error'}
            {...register('content')}
          />
          <p className={styles.errorMessage}>{errors.content?.message}</p>
        </div>
        <p className={styles.errorMessage}>{apiError}</p>
        <div className={styles.submit}>
          <input 
            type='submit'
            className={styles.create}
            value={t('new_comment_submit')}
            disabled={posting}
          />
        </div>
      </form>
    </div>
  );
}