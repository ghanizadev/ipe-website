import { CollectionAfterReadHook } from 'payload';

const updateEnrollmentsStatusesHook: CollectionAfterReadHook = async ({
  doc,
  req,
}) => {
  if (!req.url?.startsWith('/api/events')) return;

  if (!doc.enrollments) {
    const enr = await req.payload.find({
      collection: 'enrollments',
      where: {
        event: {
          equals: doc.id,
        },
      },
      depth: 0,
    });

    doc.enrollments =
      enr.totalDocs.toString() ?? 'Nenhuma inscrição encontrada';
  }

  if (!doc.paidEnrollments) {
    const paid = await req.payload.find({
      collection: 'enrollments',
      where: {
        event: {
          equals: doc.id,
        },
        'payment.paid': {
          equals: true,
        },
      },
      depth: 0,
    });

    doc.paidEnrollments =
      paid.totalDocs.toString() ?? 'Nenhuma inscrição encontrada';
  }
};

export default updateEnrollmentsStatusesHook;
