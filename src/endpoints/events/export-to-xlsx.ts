import type { Enrollment, User } from '@/payload-types';
import * as exceljs from 'exceljs';
import { PayloadHandler } from 'payload';

function getRole(role?: string | null) {
  if (!role) return '';

  switch (role) {
    case 'guide':
      return 'Guia';
    case 'parathlete':
      return 'Paratleta';
    default:
      return 'Administrador';
  }
}

function formatDate(date?: string | null) {
  if (!date) return '';

  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

function getPayment(payment: Enrollment['payment'] | undefined) {
  return payment?.paid ? 'Pago' : 'Nao pago';
}

const exportXLSX: PayloadHandler = async (req) => {
  const { eventId } = req.routeParams as Record<string, string>;

  const items = await req.payload.find({
    collection: 'enrollments',
    where: {
      event: {
        equals: eventId,
      },
    },
    limit: 0,
    depth: 1,
  });

  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet('Export');

  worksheet.addRow([
    'Função',
    'Nome',
    'Data de Nascimento',
    'Email',
    'CPF',
    'RG',
    'Endereço',
    'Tipo da camiseta',
    'Tamanho da Camiseta',
    'Situação',
  ]);

  for (const doc of items.docs as Enrollment[]) {
    if (!doc.user || typeof doc.user === 'string') continue;

    const user = doc.user as User;
    const payment = doc.payment as Enrollment['payment'];

    worksheet.addRow([
      getRole(user.role),
      user.name,
      formatDate(user.birthday),
      user.email,
      user.cpf,
      user.rg,
      user.address,
      user.tshirt?.type,
      user.tshirt?.size,
      getPayment(payment),
    ]);
  }

  return new Response(await workbook.xlsx.writeBuffer(), {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename="export.xlsx"',
    },
  });
};

export default exportXLSX;
