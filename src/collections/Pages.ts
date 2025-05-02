import validateAccess from '@/access/validateAccess';
import { lexicalHTML } from '@payloadcms/richtext-lexical';
import { CollectionConfig } from 'payload';
import slugify from 'slugify';

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Página',
    plural: 'Páginas',
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
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        readOnly: true,
        placeholder: 'Gerado Automaticamente',
      },
    },
    {
      name: 'category',
      label: 'Categoria',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'content',
      label: 'Conteúdo',
      type: 'richText',
    },
    {
      name: 'shownOnNavbar',
      label: 'Mostrar no cabecalho',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'shownOnDrawer',
      label: 'Mostrar na gaveta',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'shownOnFooter',
      label: 'Mostrar no rodapé',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    lexicalHTML('content', { name: 'html' }),
  ],
};

export default Pages;
