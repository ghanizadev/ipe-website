'use client';

import { useRouter } from 'next/navigation';

import callAlert from '@/components/alert/call-alert';
import SecondaryButton from '@/components/button/secondary-button';

import logoutService from '@/services/logout.service';

type RemoveAccountButtonProps = {
  userId: string;
  removeAccountAction: (userId: string) => Promise<void>;
};

export default function RemoveAccountButton(props: RemoveAccountButtonProps) {
  const router = useRouter();

  const handleRemoveAccount = async () => {
    const response = await callAlert('remove', {
      title: 'Atenção',
      message:
        'Você deseja mesmo remover sua conta?\n\nA remoção da sua conta será programada para exclusão definitiva após 30 dias. Caso você mude de ideia e queira mantê-la, basta entrar normalmente dentro de 30 dias.',
    });

    console.log(response);

    if (response.accepted) {
      await props.removeAccountAction(props.userId);
      await logoutService();
      router.push('/');
      router.refresh();
    }
  };

  return (
    <SecondaryButton
      tag={'button'}
      className={'border-red-800 text-red-800'}
      onClick={handleRemoveAccount}
    >
      Remover minha conta
    </SecondaryButton>
  );
}
