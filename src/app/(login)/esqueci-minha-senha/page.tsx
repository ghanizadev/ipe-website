import { Metadata } from 'next';
import { Suspense } from 'react';

import ForgotPasswordContent from './_components/forgot-password-content';

export default function ForgotMyPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordContent />
    </Suspense>
  );
}

export const metadata: Metadata = {
  title: 'Esqueci minha senha / IPE - Inclusão Pelo Esporte',
};
