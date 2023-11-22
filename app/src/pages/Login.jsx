import 'src/styles/PageLogin.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  nameOrEmail: yup.string().required().min(3),
  password: yup.string().required().min(8)
}).required();

export default function Login() {
  const { onLogin } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  const onSubmit = async data => {
    await onLogin(
      data.nameOrEmail,
      data.password
    );
    navigate('/', { replace: true });
  };

  return (
    <div className='login-page'>
      <header>
        <div className='brand'>Postery</div>
      </header>
      <form 
        className='login-form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input 
          type='text'
          placeholder='Name or email'
          {...register('nameOrEmail')}
        /><br />
        <p>{errors.nameOrEmail?.message}</p><br/>
        <input 
          type='password'
          placeholder='Password'
          {...register('password')}
        /><br />
        <p>{errors.password?.message}</p><br/>
        <input type='submit' value='Login' />
      </form>
    </div>
  );
}