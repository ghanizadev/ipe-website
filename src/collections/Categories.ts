import validateAccess from '@/access/validateAccess';
import { CollectionConfig } from 'payload';
import slugify from 'slugify';

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Categoria',
    plural: 'Categorias',
  },
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
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
    beforeChange: [
      ({ data }) => {
        data.slug = slugify(data.title).toLowerCase();
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Título',
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
  ],
};

export default Categories;
