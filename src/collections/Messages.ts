import validateAccess from '@/access/validateAccess';
import { CollectionConfig } from 'payload';

const Messages: CollectionConfig = {
  slug: 'messages',
  labels: {
    singular: 'Mensagem',
    plural: 'Mensagens',
  },
  access: {
    create: validateAccess('*', false),
    read: validateAccess(['admin']),
    delete: validateAccess(['admin']),
    readVersions: validateAccess(['admin']),
    unlock: validateAccess(['admin']),
    update: validateAccess(['admin']),
  },
  admin: {
    group: 'Contato',
  },
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
    },
    {
      name: 'phone',
      label: 'Telefone/Whatsapp',
      type: 'text',
    },
    {
      name: 'message',
      label: 'Mensagem',
      type: 'textarea',
    },
  ],
};

export default Messages;
