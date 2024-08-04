// useAuth.ts
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';

const useAuth = () => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoadingAuth(false);
      setUser(user)
    });

    return () => unsubscribe();
  }, []);

  return { user, loadingAuth };
};

export default useAuth;