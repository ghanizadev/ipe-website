import validateAccess from '@/access/validateAccess';
import ValidateAccess from '@/access/validateAccess';
import { CollectionConfig } from 'payload';

import generateImageIdHook from '@/hooks/generate-image-id.hook';

const Receipts: CollectionConfig = {
  slug: 'receipts',
  labels: {
    singular: 'Comprovante',
    plural: 'Comprovantes',
  },
  admin: {
    group: 'Mídia',
  },
  access: {
    create: validateAccess(['admin']),
    read: ValidateAccess(['admin']),
    delete: validateAccess(['admin']),
    readVersions: validateAccess(['admin']),
    unlock: validateAccess(['admin']),
    update: validateAccess(['admin']),
  },
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    focalPoint: false,
    crop: false,
  },
  hooks: {
    beforeOperation: [generateImageIdHook],
  },
  fields: [
    {
      name: 'notes',
      label: 'Notas',
      type: 'textarea',
    },
  ],
};

export default Receipts;
