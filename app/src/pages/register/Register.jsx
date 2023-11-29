import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './Register.module.scss';
import { useAuth } from 'src/utils/hooks/useAuth';

export default function Register() {
  const { t } = useTranslation();
  const { onRegister } = useAuth();
  const navigate = useNavigate();
  const [signingUp, setSigningUp] = useState(false);
  const [apiError, setApiError] = useState(null);

  const schema = useMemo(() => yup.object({
      name: yup.string()
        .required(t('field_required'))
        .min(3, t('register_name_min'))
        .max(16, t('register_name_max')),
      displayName: yup.string()
        .required(t('field_required'))
        .min(3, t('register_display_name_min'))
        .max(30, t('register_display_name_max')),
      email: yup.string()
        .required(t('field_required'))
        .email(t('register_email_invalid')),
      password: yup.string()
        .required(t('field_required'))
        .min(8, t('register_password_min')),
      confirmPassword: yup.string()
        .required(t('field_required'))
        .oneOf([yup.ref('password')], t('register_confirm_password_match')),
      profileColor: yup.string()
        .required(t('field_required'))
        .matches('^#[A-Fa-f0-9]{6}$')
    }).required(),
  []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async data => {
    setApiError(null);
    setSigningUp(true);
    const response = await onRegister(
      data.name,
      data.displayName,
      data.email,
      data.password,
      data.profileColor.replace('#', '')
    );
    setSigningUp(false);

    if (response.errorDetails === null) {
      navigate('/', { replace: true });
    } else {
      setApiError(response.errorDetails.message);
    }
  };
  
  return (
    <div className={styles.registerPage}>
      <div className={styles.registerForm}>
        <div className={`${styles.column} ${styles.colLeft}`}>
          <h1>Postery</h1>
        </div>
        <div className={`${styles.column} ${styles.colRight}`}>
          <h2>{t('register_title')}</h2>
          <p className={styles.registerDescription}>
            {t('register_description')}
          </p>
          <form 
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.formBlock}>
              <input 
                type='text'
                placeholder={t('register_name_placeholder')}
                className={errors.name && 'error'}
                {...register('name')}
              />
              <p className={styles.errorMessage}>{errors.name?.message}</p>
            </div>
            <div className={styles.formBlock}>
              <input 
                type='text'
                placeholder={t('register_display_name_placeholder')}
                className={errors.displayName && 'error'}
                {...register('displayName')}
              />
              <p className={styles.errorMessage}>{errors.displayName?.message}</p>
            </div>
            <div className={styles.formBlock}>
              <input 
                type='email'
                placeholder={t('register_email_placeholder')}
                className={errors.email && 'error'}
                {...register('email')}
              />
              <p className={styles.errorMessage}>{errors.email?.message}</p>
            </div>
            <div className={styles.formBlock}>
              <input 
                type='password'
                placeholder={t('register_password_placeholder')}
                className={errors.password && 'error'}
                {...register('password')}
              />
              <p className={styles.errorMessage}>{errors.password?.message}</p>
            </div>
            <div className={styles.formBlock}>
              <input 
                type='password'
                placeholder={t('register_confirm_password_placeholder')}
                className={errors.confirmPassword && 'error'}
                {...register('confirmPassword')}
              />
              <p className={styles.errorMessage}>{errors.confirmPassword?.message}</p>
            </div>
            <div className={styles.formBlock}>
              <div className={styles.labelBlock}>
                <label>{t('register_profile_color')}</label>
                <input 
                  type='color'
                  className={errors.profileColor && 'error'}
                  {...register('profileColor')}
                />
              </div>
            </div>
            <input 
              type='submit' 
              value={t('register_submit')}
              disabled={signingUp}
            />
            <p className={styles.errorMessage}>{apiError}</p>
          </form>
          <p className={styles.signIn}>
            {t('register_sign_in_incentive')} <Link to='/login'>{t('register_sign_in')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}