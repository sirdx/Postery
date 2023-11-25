import { createContext } from 'react';

export const initialAuthState = {
  userId: null,
  onLogin: async () => null,
  onLogout: async () => null,
  onRegister: async () => null
};

const AuthContext = createContext(initialAuthState);
export default AuthContext;