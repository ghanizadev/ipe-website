import { CollectionConfig } from 'payload';

import revalidatePublicContentCache from '@/hooks/revalidate-public-content-cache.hook';

import validateAccess from '../access/validateAccess';

const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Depoimento',
    plural: 'Depoimentos',
  },
  admin: {
    group: 'Conteúdo',
  },
  access: {
    create: validateAccess(['admin']),
    read: validateAccess('*'),
    delete: validateAccess(['admin']),
    readVersions: validateAccess(['admin']),
    unlock: validateAccess(['admin']),
    update: validateAccess(['admin']),
  },
  hooks: {
    afterChange: [revalidatePublicContentCache],
    afterDelete: [revalidatePublicContentCache],
  },
  fields: [
    {
      name: 'avatar',
      label: 'Avatar',
      type: 'upload',
      relationTo: 'avatars',
    },
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
    },
    {
      name: 'occupation',
      label: 'Ocupação',
      type: 'text',
    },
    {
      name: 'testimonial',
      label: 'Depoimento',
      type: 'textarea',
    },
  ],
};

export default Testimonials;
