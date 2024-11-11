import { APIService } from '@/services/api.service';

export class MessageService extends APIService<MessageDTO> {
  constructor() {
    super('messages');
  }
}
