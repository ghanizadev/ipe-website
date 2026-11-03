import { CollectionConfig } from 'payload';

import generateImageId from '@/hooks/generate-image-id.hook';
import revalidatePublicContentCache from '@/hooks/revalidate-public-content-cache.hook';

import setPublicUploadCacheHeaders from '@/helpers/set-public-upload-cache-headers.helper';

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
    imageSizes: [
      {
        name: 'thumbnail',
        width: 640,
        height: 640,
        fit: 'inside',
      },
    ],
    modifyResponseHeaders: setPublicUploadCacheHeaders,
  },
  hooks: {
    beforeOperation: [generateImageId],
    afterChange: [revalidatePublicContentCache],
    afterDelete: [revalidatePublicContentCache],
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
