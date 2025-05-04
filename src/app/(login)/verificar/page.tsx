import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import verifyAccountAction from '@/app/(login)/verificar/_actions/verify-account.action';
import Validate from '@/app/(login)/verificar/_components/validate';

export default async function VerifyAccountPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return redirect('/');
  }

  return <Validate token={token} validateAction={verifyAccountAction} />;
}

export const metadata: Metadata = {
  title: 'Aguarde...',
};
