import { useAuth } from 'src/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Register() {
  const { onRegister } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileColor, setProfileColor] = useState("#ffffff");

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onRegister(
      name,
      displayName,
      email,
      password,
      profileColor.replace('#', '')
    );
    navigate('/', { replace: true });
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />
        <input 
          type='text'
          placeholder='Display name'
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        /><br />
        <input 
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input 
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <input 
          type='color'
          value={profileColor}
          onChange={(e) => setProfileColor(e.target.value)}
        /><br />
        <input type='submit' value='Register' />
      </form>
    </div>
  );
}