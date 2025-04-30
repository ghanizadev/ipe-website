'use client';

import { User } from '@/payload-types';
import React, { createContext, useContext } from 'react';

const context = createContext<{ user?: User }>({});

export const UserProvider: React.FC<{
  value: { user?: User };
  children: React.ReactNode;
}> = ({ children, value }) => {
  return <context.Provider value={value}>{children}</context.Provider>;
};

export function useUser() {
  return useContext(context).user;
}
