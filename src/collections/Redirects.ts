import { CollectionConfig } from 'payload';

import validateAccess from '../access/validateAccess';
import ValidateAccess from '../access/validateAccess';

const Redirects: CollectionConfig = {
  slug: 'redirects',
  labels: {
    singular: 'Redirecionamento',
    plural: 'Redirecionamentos',
  },
  admin: {
    group: 'Manutenção',
  },
  access: {
    create: validateAccess(['admin']),
    read: ValidateAccess(['admin', 'service']),
    delete: validateAccess(['admin']),
    readVersions: validateAccess(['admin']),
    unlock: validateAccess(['admin']),
    update: validateAccess(['admin']),
  },
  hooks: {
    afterChange: [
      /* TODO Add redeploy trigger */
    ],
  },
  fields: [
    {
      name: 'source',
      label: 'URL de origem',
      required: true,
      type: 'text',
    },
    {
      name: 'target',
      label: 'URL de destino',
      required: true,
      type: 'text',
    },
    {
      name: 'code',
      label: 'Código de redirecionamento',
      type: 'select',
      defaultValue: '307',
      options: [
        {
          label: 'Movido permanentemente (301)',
          value: '301',
        },
        {
          label: 'Redirecionamento temporário (307)',
          value: '307',
        },
        {
          label: 'Redirecionamento permanente (308)',
          value: '308',
        },
      ],
    },
  ],
};

export default Redirects;
