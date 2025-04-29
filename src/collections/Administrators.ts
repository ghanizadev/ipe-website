import validateAccess from '@/access/validateAccess';
import adminEmailForgotTemplate from '@/mail/admin/forgot';
import adminEmailVerifyTemplate from '@/mail/admin/verify';
import { CollectionConfig } from 'payload';

const Administrators: CollectionConfig = {
  slug: 'admins',
  labels: {
    singular: 'Administrador',
    plural: 'Administradores',
  },
  auth: {
    verify: adminEmailVerifyTemplate,
    forgotPassword: adminEmailForgotTemplate,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Manutenção',
    hidden: ({ user }) => user?.role !== 'admin',
  },
  access: {
    create: validateAccess(['admin']),
    read: validateAccess(['admin']),
    delete: validateAccess(['admin']),
    readVersions: validateAccess(['admin']),
    unlock: validateAccess(['admin']),
    update: validateAccess(['admin']),
  },
  fields: [
    {
      name: 'role',
      type: 'text',
      defaultValue: 'admin',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
  ],
};

export default Administrators;
