import validateAccess from '@/access/validateAccess';
import { CollectionConfig } from 'payload';

import generateImageIdHook from '@/hooks/generate-image-id.hook';

const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Mídia',
    plural: 'Mídias',
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
    mimeTypes: ['image/*', 'video/*'],
    focalPoint: false,
    crop: false,
  },
  hooks: {
    beforeOperation: [generateImageIdHook],
  },
  fields: [
    {
      name: 'altText',
      label: 'Alt Text',
      type: 'text',
    },
  ],
};

export default Media;
