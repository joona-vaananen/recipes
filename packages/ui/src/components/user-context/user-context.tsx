'use client';

import { sendGTMEvent } from '@next/third-parties/google';
import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

const USER_ID_LOCAL_STORAGE_ITEM_KEY = 'userId';

const UserContext = createContext<{ userId: string | null } | undefined>(
  undefined
);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let userId: string | null = null;

    try {
      userId = window.localStorage.getItem(USER_ID_LOCAL_STORAGE_ITEM_KEY);
    } catch {}

    if (!userId) {
      userId = uuid();

      try {
        window.localStorage.setItem(USER_ID_LOCAL_STORAGE_ITEM_KEY, userId);
      } catch {}
    }

    setUserId(userId);
    sendGTMEvent({ user_id: userId });
  }, []);

  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const user = useContext(UserContext);

  if (typeof user === 'undefined') {
    throw new Error('useUser must be used within a UserProvider');
  }

  return user;
};
