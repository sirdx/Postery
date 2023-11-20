import { useNavigate } from 'react-router-dom';
import { register } from 'src/api/Auth';
import { createPost } from 'src/api/Post';
import { useAuth } from 'src/hooks/useAuth';

export default function Login() {
  const { onLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await register('react', 'react@gmail.com', '123');
    await onLogin('react', '123');
    await createPost('Nowy post', 'Test');
    navigate('/', { replace: true });
  };

  return (
    <>
      <button onClick={handleLogin}>Login</button>
    </>
  );
}