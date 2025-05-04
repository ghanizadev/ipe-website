import validateAccess from '@/access/validateAccess';
import { CollectionConfig, ValidationError } from 'payload';

const Enrollments: CollectionConfig = {
  slug: 'enrollments',
  labels: {
    singular: 'Inscrição',
    plural: 'Inscrições',
  },
  access: {
    create: validateAccess(['admin', 'service', 'guide', 'parathlete']),
    read: validateAccess(['admin', 'service']),
    delete: validateAccess(['admin', 'guide', 'parathlete']),
    readVersions: validateAccess(['admin']),
    unlock: validateAccess(['admin']),
    update: validateAccess(['admin']),
  },
  admin: {
    group: 'Calendário',
  },
  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        if (operation === 'create') {
          const count = await req.payload.count({
            collection: 'enrollments',
            where: {
              and: [
                { event: { equals: data.event } },
                { user: { equals: data.user } },
              ],
            },
            overrideAccess: true,
          });

          if (count?.totalDocs)
            throw new ValidationError({
              errors: [
                {
                  path: 'user',
                  message: 'The user is already enrolled for this event',
                },
              ],
            });
        }
      },
    ],
  },
  fields: [
    {
      name: 'user',
      label: 'Usuário',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'event',
      label: 'Evento',
      type: 'relationship',
      relationTo: 'events',
      required: true,
    },
    {
      name: 'modality',
      label: 'Modalidade',
      type: 'select',
      options: ['3km (caminhada)', '5km', '10km', '21km', '42km'],
    },
    {
      name: 'payment',
      label: 'Pagamento',
      type: 'group',
      fields: [
        {
          name: 'paid',
          label: 'Pago',
          type: 'checkbox',
        },
        {
          name: 'docNumber',
          label: 'Número do documento',
          type: 'text',
          admin: {
            condition: (data) => data.payment.paid,
          },
        },
        {
          name: 'paidAt',
          label: 'Pagamento confirmado em',
          type: 'date',
          admin: {
            condition: (data) => data.payment.paid,
          },
        },
        {
          name: 'confirmation',
          label: 'Confirmação do pagamento',
          type: 'upload',
          relationTo: 'receipts',
          admin: {
            condition: (data) => data.payment.paid,
          },
        },
      ],
    },
  ],
};

export default Enrollments;
