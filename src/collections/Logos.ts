import { CollectionConfig } from 'payload';

import generateImageIdHook from '@/hooks/generate-image-id.hook';

import validateAccess from '../access/validateAccess';

const Logos: CollectionConfig = {
  slug: 'logos',
  labels: {
    singular: 'Logo',
    plural: 'Logos',
  },
  admin: {
    group: 'Mídia',
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
    crop: true,
    imageSizes: [
      {
        name: 'lg',
        width: 512,
        height: 512,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
      {
        name: 'md',
        width: 128,
        height: 128,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
      {
        name: 'sm',
        width: 64,
        height: 64,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    ],
  },
  hooks: {
    beforeOperation: [generateImageIdHook],
  },
  fields: [],
};

export default Logos;
