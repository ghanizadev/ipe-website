'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import logoutService from '@/services/logout.service';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutService();
    router.push('/');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      type={'button'}
      className={'mt-2 text-red-700 underline'}
    >
      Sair
    </button>
  );
}
