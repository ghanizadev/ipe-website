import { CollectionConfig } from 'payload';

import validateAccess from '../access/validateAccess';

const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Serviço',
    plural: 'Serviços',
  },
  admin: {
    group: 'Manutenção',
  },
  auth: {
    disableLocalStrategy: true,
    useAPIKey: true,
  },
  access: {
    create: validateAccess(['admin']),
    read: validateAccess(['admin']),
    delete: validateAccess(['admin']),
    readVersions: validateAccess(['admin']),
    unlock: validateAccess(['admin']),
    update: validateAccess(['admin']),
  },
  fields: [
    {
      name: 'role',
      type: 'text',
      defaultValue: 'service',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'name',
      label: 'Nome do serviço',
      type: 'text',
    },
  ],
};

export default Services;
