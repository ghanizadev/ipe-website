import { CollectionConfig } from 'payload';

import createSlugHook from '@/hooks/create-slug.hook';

import validateAccess from '../access/validateAccess';

const Parathletes: CollectionConfig = {
  slug: 'parathletes',
  labels: {
    singular: 'Paratleta',
    plural: 'Paratletas',
  },
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'name',
  },
  access: {
    create: validateAccess(['admin']),
    read: validateAccess(['admin', 'service']),
    delete: validateAccess(['admin']),
    readVersions: validateAccess(['admin']),
    unlock: validateAccess(['admin']),
    update: validateAccess(['admin']),
  },
  hooks: {
    beforeChange: [createSlugHook('title')],
  },
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        readOnly: true,
        placeholder: 'Gerado automaticamente',
      },
    },
    {
      name: 'since',
      label: 'Desde',
      type: 'date',
    },
    {
      name: 'message',
      label: 'Mensagem',
      type: 'richText',
    },
    {
      name: 'sponsorship',
      label: 'Apadrinhamento',
      type: 'text',
    },
    {
      name: 'socials',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          label: 'Facebook',
          type: 'text',
        },
        {
          name: 'instagram',
          label: 'Instagram',
          type: 'text',
        },
        {
          name: 'twitter',
          label: 'X (antigo Twitter)',
          type: 'text',
        },
      ],
    },
  ],
};

export default Parathletes;
