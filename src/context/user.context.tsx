'use client';

import { User } from '@/payload-types';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getUserAuth } from '@/actions/get-user-auth.action';
import { getUser } from '@/actions/get-user.action';

const context = createContext<{
  user?: User;
  refresh: () => Promise<User | undefined>;
}>({
  refresh: async () => undefined,
});

export const UserProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      const auth = await getUserAuth();
      if (active) setUser(auth.user as User | undefined);
    };

    void loadUser();

    return () => {
      active = false;
    };
  }, []);

  const refresh = useCallback(async () => {
    const auth = await getUserAuth();

    if (!auth.user) {
      setUser(undefined);
      return undefined;
    }
    const updatedUser = await getUser(auth.user.id);
    setUser(updatedUser);
    return updatedUser;
  }, []);

  return (
    <context.Provider value={{ user, refresh }}>{children}</context.Provider>
  );
};

export function useUser(): [User | undefined, () => Promise<User | undefined>] {
  const ctx = useContext(context);
  return [ctx.user, ctx.refresh];
}
