import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './Login.module.scss';
import { useAuth } from 'src/utils/hooks/useAuth';

export default function Login() {
  const { t } = useTranslation();
  const { onLogin } = useAuth();
  const navigate = useNavigate();
  const [loggingIn, setLoggingIn] = useState(false);
  const [apiError, setApiError] = useState(null);

  const schema = useMemo(() => 
    yup.object({
      nameOrEmail: yup.string()
        .required(t('field_required'))
        .min(3, t('login_name_or_email_min')),
      password: yup.string()
        .required(t('field_required'))
        .min(8, t('login_password_min'))
    }).required(), 
  []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  const onSubmit = async data => {
    setApiError(null);
    setLoggingIn(true);
    const response = await onLogin(
      data.nameOrEmail,
      data.password
    );
    setLoggingIn(false);

    if (response.errorDetails === null) {
      navigate('/', { replace: true });
    } else {
      setApiError(response.errorDetails.message);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginForm}>
        <div className={`${styles.column} ${styles.colLeft}`}>
          <h1>Postery</h1>
        </div>
        <div className={`${styles.column} ${styles.colRight}`}>
          <h2>{t('login_title')}</h2>
          <p className={styles.loginDescription}>
            {t('login_description')}
          </p>
          <form 
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.formBlock}>
              <input 
                type='text'
                placeholder={t('login_name_or_email_placeholder')}
                className={errors.nameOrEmail && 'error'}
                {...register('nameOrEmail')}
              />
              <p className={styles.errorMessage}>{errors.nameOrEmail?.message}</p>
            </div>
            <div className={styles.formBlock}>
              <input 
                type='password'
                placeholder={t('login_password_placeholder')}
                className={errors.password && 'error'}
                {...register('password')}
              />
              <p className={styles.errorMessage}>{errors.password?.message}</p>
            </div>
            <input 
              type='submit' 
              value={t('login_submit')}
              disabled={loggingIn}
            />
            <p className={styles.errorMessage}>{apiError}</p>
          </form>
          <p className={styles.signUp}>
            {t('login_sign_up_incentive')} <Link to='/register'>{t('login_sign_up')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}