import React, { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
import { auth, signInWithGoogle, logout } from '../services/firebase';
import { AuthContext } from './authContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      authAvailable: !Capacitor.isNativePlatform(),
      signIn: signInWithGoogle,
      signOut: logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
