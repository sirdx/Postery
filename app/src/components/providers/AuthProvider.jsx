import {  useMemo } from 'react';
import { login, logout, register } from 'src/api/Auth';
import { getUser } from 'src/api/User';
import { AuthContext } from 'src/hooks/useAuth';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

export const USER_ID_KEY = 'userId';

export default function AuthProvider({ children }) {
  const [userId, setUserId] = useLocalStorage(USER_ID_KEY, null);

  const handleUserData = async () => {
    return await getUser(userId);
  };

  const handleLogin = async (nameOrEmail, password) => {
    const userData = await login(nameOrEmail, password);
    setUserId(userData.id);
  };

  const handleLogout = async () => {
    await logout();
    setUserId(null);
  };

  const handleRegister = async (
    name,
    displayName,
    email,
    password,
    profileColor
  ) => {
    const userData = await register(name, displayName, email, password, profileColor);
    setUserId(userData.id);
  };

  const contextValue = useMemo(
    () => ({
      userId,
      onUserData: handleUserData,
      onLogin: handleLogin,
      onLogout: handleLogout,
      onRegister: handleRegister
    }),
    [userId]
  );

  return ( 
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider> 
  );
}