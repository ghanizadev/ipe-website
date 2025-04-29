import { CronJobEffectArgs } from '@/plugins/cron-job.plugin';
import { CollectionConfig, User, ValidationError } from 'payload';
import type { TransformCollectionWithSelect } from 'payload';

import validateAccess from '../access/validateAccess';
import deleteUser from '../endpoints/users/delete-user';
import recoverUser from '../endpoints/users/recover-user';
import usersEmailForgotTemplate from '../mail/users/forgot';
import usersEmailVerifyTemplate from '../mail/users/verify';

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Usuário',
    plural: 'Usuários',
  },
  auth: {
    verify: usersEmailVerifyTemplate,
    forgotPassword: usersEmailForgotTemplate,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Manutenção',
    hidden: ({ user }) => user?.role !== 'admin',
  },
  access: {
    create: validateAccess(['admin', 'service']),
    read: validateAccess(['admin', 'service', 'guide', 'parathlete']),
    delete: validateAccess(['admin', 'service', 'guide', 'parathlete']),
    readVersions: validateAccess(['admin']),
    unlock: validateAccess(['admin']),
    update: validateAccess(['admin', 'service', 'guide', 'parathlete']),
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && data.role === 'admin') {
          throw new ValidationError({
            errors: [{ path: 'role', message: 'Invalid role field' }],
          });
        }
      },
    ],
    beforeRead: [
      (args) => {
        if (
          args.req.user?.role &&
          !['admin', 'service'].includes(args.req.user.role) &&
          args.req.user.id !== args.doc.id
        )
          throw new Error();
      },
    ],
  },
  custom: {
    cronJob: {
      name: 'deleteUser',
      frequency: 3_600,
      handler: async ({ payload }: CronJobEffectArgs) => {
        const date = new Date();
        date.setDate(date.getDate() - 30);

        const toDelete = await payload.find({
          collection: 'users',
          where: {
            softDelete: {
              less_than_equal: date,
            },
          },
        });

        const promises: Promise<
          TransformCollectionWithSelect<'users', User>
        >[] = [];

        for (const user of toDelete.docs) {
          promises.push(
            payload.delete({
              collection: 'users',
              id: user.id,
            })
          );
        }

        //TODO Delete enrollments

        const response = await Promise.allSettled(promises);
        console.log('%d users deleted', response.length);
      },
    },
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'guide', 'parathlete'],
      admin: {
        condition: (data, siblingData, { user }) => user?.role === 'admin',
      },
    },
    {
      name: 'softDelete',
      type: 'date',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'name',
      label: 'Nome completo',
      type: 'text',
    },
    {
      name: 'gender',
      label: 'Gênero',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Feminino',
          value: 'f',
        },
        {
          label: 'Masculino',
          value: 'm',
        },
        {
          label: 'Prefiro não dizer',
          value: 'nda',
        },
      ],
    },
    {
      name: 'pwdClassification',
      label: 'Classificação PCD',
      type: 'select',
      options: [
        { label: 'Deficiente Físico', value: 'physical' },
        { label: 'Deficiente Intelectual', value: 'intelectual' },
        { label: 'Deficiente Visual', value: 'visual' },
      ],
    },
    {
      name: 'birthday',
      label: 'Data de aniversário',
      type: 'date',
    },
    {
      name: 'address',
      label: 'Endreço',
      type: 'textarea',
    },
    {
      name: 'cpf',
      label: 'CPF (Certidão de Pessoa Física)',
      type: 'text',
    },
    {
      name: 'rg',
      label: 'RG (Registro Geral)',
      type: 'text',
    },
    {
      name: 'tshirt',
      label: 'Camiseta',
      type: 'group',
      fields: [
        {
          name: 'type',
          label: 'Tipo da camiseta',
          type: 'select',
          options: [
            {
              label: 'Masculino',
              value: 'masc',
            },
            {
              label: 'Feminino',
              value: 'fem',
            },
            {
              label: 'Infantil',
              value: 'inf',
            },
          ],
        },
        {
          name: 'size',
          label: 'Tamanho',
          type: 'select',
          options: [
            {
              label: 'P (Pequeno)',
              value: 'P',
            },
            {
              label: 'M (Médio)',
              value: 'M',
            },
            {
              label: 'G (Grande)',
              value: 'G',
            },
            {
              label: 'XG (Extra Grande)',
              value: 'XG',
            },
          ],
        },
      ],
    },
  ],
  endpoints: [
    {
      method: 'delete',
      path: '/:userId/schedule',
      handler: deleteUser,
    },
    {
      method: 'patch',
      path: '/:userId/recover',
      handler: recoverUser,
    },
  ],
};

export default Users;
