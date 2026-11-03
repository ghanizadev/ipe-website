import { Metadata } from 'next';
import { Suspense } from 'react';

import verifyAccountAction from '@/app/(login)/verificar/_actions/verify-account.action';
import Validate from '@/app/(login)/verificar/_components/validate';

export default function VerifyAccountPage() {
  return (
    <Suspense fallback={null}>
      <Validate validateAction={verifyAccountAction} />
    </Suspense>
  );
}

export const metadata: Metadata = {
  title: 'Aguarde...',
};
