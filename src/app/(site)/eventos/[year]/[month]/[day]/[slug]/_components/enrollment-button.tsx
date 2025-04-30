'use client';

import { useUser } from '@/context/user.context';
import { Event } from '@/payload-types';
import { useRouter } from 'next/navigation';

type EnrollmentButtonProps = {
  event: Event;
};

export default function EnrollmentButton({ event }: EnrollmentButtonProps) {
  const user = useUser();
  const router = useRouter();

  const handleEnrollment = async () => {
    if (!event) {
      router.replace('/');
      return;
    }

    if (!user) {
      const url = new URL(window.location.href);
      url.searchParams.set('register', '1');
      router.push(
        '/entrar?source=enrollment&redirect=' +
          encodeURIComponent(url.toString())
      );
      return;
    }

    router.push(window.location.pathname + '?register=1');
  };

  return (
    <button
      onClick={handleEnrollment}
      type={'button'}
      disabled={!event}
      className={
        'rounded-2xl bg-[--primary] px-6 py-4 text-2xl text-white hover:bg-[--primary-darker]'
      }
    >
      Inscreva-se!
    </button>
  );
}
