import { Access } from 'payload';

function validateAccess(
  roles: ('admin' | 'parathlete' | 'guide' | 'service')[] | '*',
  allowUI = true
) {
  return <Access>function (access) {
    const me = access.req.user?.role;

    if (!allowUI && access.req.url === '/api/access' && me !== 'admin')
      return false;

    if (me && roles === '*') return true;

    return me && roles.includes(me);
  };
}

export default validateAccess;
