import { PayloadHandler } from 'payload';

const recoverUser: PayloadHandler = async (req) => {
  const { userId } = req.routeParams as Record<string, string>;

  if (
    req.user?.role &&
    !['admin', 'service', 'parathlete', 'guide'].includes(req.user?.role)
  )
    return new Response(null, { status: 401 });

  await req.payload.update({
    collection: 'users',
    where: {
      id: {
        equals: userId,
      },
    },
    data: {
      softDelete: null,
    },
  });

  return new Response(null, { status: 204 });
};

export default recoverUser;
