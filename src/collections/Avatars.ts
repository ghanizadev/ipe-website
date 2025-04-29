import validateAccess from '@/access/validateAccess';
import { CollectionConfig } from 'payload';

import generateImageIdHook from '@/hooks/generate-image-id.hook';

const Avatars: CollectionConfig = {
  slug: 'avatars',
  labels: {
    singular: 'Avatar',
    plural: 'Avatares',
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
      },
      {
        name: 'md',
        width: 128,
        height: 128,
      },
      {
        name: 'sm',
        width: 64,
        height: 64,
      },
    ],
  },
  hooks: {
    beforeOperation: [generateImageIdHook],
  },
  fields: [],
};

export default Avatars;
