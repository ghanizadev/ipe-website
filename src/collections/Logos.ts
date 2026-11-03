import { CollectionConfig } from 'payload';

import generateImageIdHook from '@/hooks/generate-image-id.hook';
import revalidatePublicContentCache from '@/hooks/revalidate-public-content-cache.hook';

import setPublicUploadCacheHeaders from '@/helpers/set-public-upload-cache-headers.helper';

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
    modifyResponseHeaders: setPublicUploadCacheHeaders,
  },
  hooks: {
    beforeOperation: [generateImageIdHook],
    afterChange: [revalidatePublicContentCache],
    afterDelete: [revalidatePublicContentCache],
  },
  fields: [],
};

export default Logos;
