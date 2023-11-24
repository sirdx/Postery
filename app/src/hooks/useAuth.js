import { createContext, useContext } from 'react';

const initialAuthState = {
  userId: null,
  onLogin: async (nameOrEmail, password) => null,
  onLogout: async () => null,
  onRegister: async (name, displayName, email, password, profileColor) => null
};

export const AuthContext = createContext(initialAuthState);

export function useAuth() {
  return useContext(AuthContext);
}