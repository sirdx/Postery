import 'src/styles/PageRegister.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const schema = yup.object({
  name: yup.string().required().min(3).max(16),
  displayName: yup.string().required().min(3).max(30),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  profileColor: yup.string().required().matches('^#[A-Fa-f0-9]{6}$')
}).required();

export default function Register() {
  const { t } = useTranslation();
  const { onRegister } = useAuth();
  const navigate = useNavigate();
  const [signingUp, setSigningUp] = useState(false);
  const [apiError, setApiError] = useState(null);

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
    <div className='register-page'>
      <div className='register-form'>
        <div className='column col-left'>
          <h1>Postery</h1>
        </div>
        <div className='column col-right'>
          <h2>{t('register_title')}</h2>
          <p className='register-description'>
            {t('register_description')}
          </p>
          <form 
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='form-block'>
              <input 
                type='text'
                placeholder={t('register_name_placeholder')}
                className={errors.name && 'error'}
                {...register('name')}
              />
              <p className='error-message'>{errors.name?.message}</p>
            </div>
            <div className='form-block'>
              <input 
                type='text'
                placeholder={t('register_display_name_placeholder')}
                className={errors.displayName && 'error'}
                {...register('displayName')}
              />
              <p className='error-message'>{errors.displayName?.message}</p>
            </div>
            <div className='form-block'>
              <input 
                type='email'
                placeholder={t('register_email_placeholder')}
                className={errors.email && 'error'}
                {...register('email')}
              />
              <p className='error-message'>{errors.email?.message}</p>
            </div>
            <div className='form-block'>
              <input 
                type='password'
                placeholder={t('register_password_placeholder')}
                className={errors.password && 'error'}
                {...register('password')}
              />
              <p className='error-message'>{errors.password?.message}</p>
            </div>
            <div className='form-block'>
              <div className='label-block'>
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
            <p className='error-message'>{apiError}</p>
          </form>
          <p className='sign-in'>
            {t('register_sign_in_incentive')} <Link to='/login'>{t('register_sign_in')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}