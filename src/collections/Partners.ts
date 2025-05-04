import { CollectionConfig } from 'payload';

import validateAccess from '../access/validateAccess';

const Partners: CollectionConfig = {
  slug: 'partners',
  labels: {
    singular: 'Parceiro',
    plural: 'Parceiros',
  },
  admin: {
    group: 'Parceiros',
  },
  access: {
    create: validateAccess(['admin']),
    read: validateAccess(['admin', 'service']),
    delete: validateAccess(['admin']),
    readVersions: validateAccess(['admin']),
    unlock: validateAccess(['admin']),
    update: validateAccess(['admin']),
  },
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
    },
    {
      name: 'type',
      label: 'Tipo',
      type: 'select',
      options: [
        {
          label: 'Empresa',
          value: 'company',
        },
        {
          label: 'Apoio',
          value: 'support',
        },
      ],
    },
    {
      name: 'link',
      label: 'Link',
      type: 'text',
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'logos',
    },
  ],
};

export default Partners;
