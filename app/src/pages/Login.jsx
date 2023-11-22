import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';
import { useState } from 'react';

export default function Login() {
  const { onLogin } = useAuth();
  const navigate = useNavigate();

  const [nameOrEmail, setNameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await onLogin(
      nameOrEmail, 
      password
    );
    navigate('/', { replace: true });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          placeholder='Name or email'
          value={nameOrEmail}
          onChange={(e) => setNameOrEmail(e.target.value)}
        /><br />
        <input 
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <input type='submit' value='Login' />
      </form>
    </div>
  );
}