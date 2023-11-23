import 'src/styles/PageLogin.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

const schema = yup.object({
  nameOrEmail: yup.string().required().min(3),
  password: yup.string().required().min(8)
}).required();

export default function Login() {
  const { onLogin } = useAuth();
  const navigate = useNavigate();
  const [loggingIn, setLoggingIn] = useState(false);
  const [apiError, setApiError] = useState(null);

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

    if (response === null) {
      navigate('/', { replace: true });
    } else {
      setApiError(response);
    }
  };

  return (
    <div className='login-page'>
      <div className='login-form'>
        <div className='column col-left'>
          <h1>Postery</h1>
        </div>
        <div className='column col-right'>
          <h2>Sign in</h2>
          <p className='login-description'>Log in with the data that you entered<br></br>during the registration</p>
          <form 
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='form-block'>
              <input 
                type='text'
                placeholder='Name or email'
                className={errors.nameOrEmail && 'error'}
                {...register('nameOrEmail')}
              />
              <p className='error-message'>{errors.nameOrEmail?.message}</p>
            </div>
            <div className='form-block'>
              <input 
                type='password'
                placeholder='Password'
                className={errors.password && 'error'}
                {...register('password')}
              />
              <p className='error-message'>{errors.password?.message}</p>
            </div>
            <input 
              type='submit' 
              value='Login'
              disabled={loggingIn}
            />
            <p className='error-message'>{apiError}</p>
          </form>
          <p className='sign-up'>Don't have an account? <Link to='/register'>Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}