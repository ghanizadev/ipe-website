import { NotificationProps } from '@/components/toast/types';

export const KNOWN_EVENTS: Record<
  string,
  NotificationProps & { duration: number }
> = {
  'confirmation-successful': {
    title: 'Conta verificada com sucesso!',
    message:
      'Você já pode se inscrever nos nossos eventos, confira nosso calendário na página inicial',
    type: 'success',
    duration: -1,
  },
  'confirmation-error': {
    title: 'Falha ao verificar sua conta',
    message:
      'Ocorreu um erro ao verificar sua conta, verifique se o link usado está correto e tente novamente.',
    type: 'error',
    duration: -1,
  },
};
