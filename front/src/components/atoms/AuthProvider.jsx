import { useMemo } from 'react';
import { login, logout, register } from 'src/api/Auth';
import AuthContext, { initialAuthState } from 'src/utils/context/AuthContext';
import { useLocalStorage } from 'src/utils/hooks/useLocalStorage';

export const USER_ID_KEY = 'userId';

export default function AuthProvider({ children }) {
  const [userId, setUserId] = useLocalStorage(USER_ID_KEY, initialAuthState.userId);

  const handleLogin = async (nameOrEmail, password) => {
    const response = await login(nameOrEmail, password);
    const data = response.data;

    if (data === null) {
      return response;
    }

    setUserId(data.id);
    return response;
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
    const response = await register(name, displayName, email, password, profileColor);
    const data = response.data;

    if (data === null) {
      return response;
    }

    setUserId(data.id);
    return response;
  };

  const contextValue = useMemo(
    () => ({
      userId: userId,
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