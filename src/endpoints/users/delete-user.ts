import { PayloadHandler } from 'payload';

const deleteUser: PayloadHandler = async (req) => {
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
      softDelete: new Date().toISOString(),
    },
  });

  return new Response(null, { status: 204 });
};

export default deleteUser;
