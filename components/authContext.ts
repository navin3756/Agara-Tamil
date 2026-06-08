import { createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
import { logout, signInWithGoogle } from '../services/firebase';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  authAvailable: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  authAvailable: !Capacitor.isNativePlatform(),
  signIn: signInWithGoogle,
  signOut: logout,
});

export const useAuth = () => useContext(AuthContext);
