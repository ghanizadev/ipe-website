import { CollectionConfig } from 'payload';

import validateAccess from '../access/validateAccess';

const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Produto',
    plural: 'Produtos',
  },
  admin: {
    group: 'Loja',
  },
  access: {
    create: validateAccess(['admin']),
    read: validateAccess('*'),
    delete: validateAccess(['admin']),
    readVersions: validateAccess(['admin']),
    unlock: validateAccess(['admin']),
    update: validateAccess(['admin']),
  },
  fields: [
    {
      name: 'photos',
      label: 'Fotos',
      type: 'array',
      fields: [
        {
          name: 'photo',
          label: 'Foto',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'description',
          label: 'Descrição',
          type: 'text',
        },
      ],
    },
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
    },
    {
      name: 'price',
      label: 'Preço',
      type: 'number',
    },
    {
      name: 'link',
      label: 'Link',
      type: 'text',
    },
  ],
};

export default Products;
