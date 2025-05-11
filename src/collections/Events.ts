import validateAccess from '@/access/validateAccess';
import exportXLSX from '@/endpoints/events/export-to-xlsx';
import { lexicalHTML } from '@payloadcms/richtext-lexical';
import { CollectionConfig } from 'payload';

import createSlugHook from '@/hooks/create-slug.hook';
import createVirtualIdHook from '@/hooks/create-virtual-id.hook';
import updateEnrollmentsStatusesHook from '@/hooks/update-enrollment-status.hook';

const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Evento',
    plural: 'Eventos',
  },
  admin: {
    group: 'Calendário',
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
    afterRead: [
      createVirtualIdHook('virtualId'),
      updateEnrollmentsStatusesHook,
    ],
    beforeChange: [
      createSlugHook('title'),
      ({ data }) => {
        delete data.paidEnrollments;
        delete data.enrollments;
        delete data.virtualId;
      },
    ],
  },
  fields: [
    {
      name: 'virtualId',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        placeholder: 'Gerado Automaticamente',
      },
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      label: 'Data',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'modality',
      label: 'Modalidade',
      type: 'text',
      hasMany: true,
    },
    {
      name: 'dueDate',
      label: 'Inscrições até',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'standFirst',
      required: true,
      label: 'Parágrafo introdutório',
      type: 'textarea',
    },
    {
      name: 'location',
      required: true,
      label: 'Lugar',
      type: 'textarea',
    },
    {
      name: 'fee',
      required: true,
      label: 'Taxa de inscricao',
      type: 'number',
    },
    {
      name: 'content',
      required: true,
      label: 'Conteúdo',
      type: 'richText',
    },
    {
      name: 'instructions',
      required: true,
      label: 'Instruções',
      type: 'richText',
    },
    {
      name: 'image',
      required: true,
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'enrollments',
      label: 'Inscritos',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'paidEnrollments',
      label: 'Inscrições pagas',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'seeEnrollments',
      label: 'Ver inscrições',
      type: 'ui',
      admin: {
        components: {
          Field: {
            path: '@/components/admin/custom-button',
            exportName: 'CustomButton',
            clientProps: {
              url: `/admin/collections/enrollments?limit=10&page=1&${encodeURI(`where[or][0][and][0][event][equals]=`)}:virtualId`,
              label: 'Ver inscrições',
            },
          },
        },
        position: 'sidebar',
      },
    },
    {
      name: 'downloadEnrollments',
      label: 'Exportar inscrições',
      type: 'ui',
      admin: {
        components: {
          Field: {
            path: '@/components/admin/custom-button',
            exportName: 'CustomButton',
            clientProps: {
              url: `/api/events/:virtualId/export`,
              label: 'Exportar inscrições',
            },
          },
        },
        position: 'sidebar',
      },
    },
    lexicalHTML('content', { name: 'html' }),
    lexicalHTML('instructions', { name: 'instructionsHtml' }),
  ],
  endpoints: [
    {
      method: 'get',
      path: '/:eventId/export',
      handler: exportXLSX,
    },
  ],
};

export default Events;
