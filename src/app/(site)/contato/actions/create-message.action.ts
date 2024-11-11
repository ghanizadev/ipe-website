'use server';

import { MessageService } from '@/services/message.service';

export default async function createMessageAction(
  message: MessageDTO
): Promise<boolean> {
  const service = new MessageService();
  const response = await service.create(message);
  return !!response;
}
