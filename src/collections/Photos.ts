import { CollectionConfig } from 'payload';

import generateImageId from '@/hooks/generate-image-id.hook';

import validateAccess from '../access/validateAccess';

const Photos: CollectionConfig = {
  slug: 'photos',
  labels: {
    singular: 'Foto',
    plural: 'Fotos',
  },
  admin: {
    group: 'Galeria de Fotos',
  },
  access: {
    create: validateAccess(['admin']),
    read: () => true,
    delete: validateAccess(['admin']),
    readVersions: validateAccess(['admin']),
    unlock: validateAccess(['admin']),
    update: validateAccess(['admin']),
  },
  upload: {
    mimeTypes: ['image/*'],
    focalPoint: false,
    crop: false,
  },
  hooks: {
    beforeOperation: [generateImageId],
  },
  fields: [
    {
      name: 'description',
      label: 'Descrição',
      type: 'text',
    },
    {
      name: 'altText',
      type: 'text',
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
    },
  ],
};

export default Photos;
