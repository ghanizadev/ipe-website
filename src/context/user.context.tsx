'use client';

import { User } from '@/payload-types';
import React, { createContext, useCallback, useContext, useState } from 'react';

import { getUser } from '@/actions/get-user.action';

const context = createContext<{ user?: User; refresh: () => Promise<void> }>({
  refresh: async () => {},
});

export const UserProvider: React.FC<{
  value: { user?: User };
  children: React.ReactNode;
}> = ({ children, value }) => {
  const [user, setUser] = useState<User | undefined>(value.user);

  const refresh = useCallback(async () => {
    if (!value.user) return;
    const updatedUser = await getUser(value.user.id);
    setUser(updatedUser);
  }, [value.user]);

  return (
    <context.Provider value={{ user, refresh }}>{children}</context.Provider>
  );
};

export function useUser(): [User | undefined, () => Promise<void>] {
  const ctx = useContext(context);
  return [ctx.user, ctx.refresh];
}
