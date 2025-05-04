type Role = 'admin' | 'parathlete' | 'guide' | 'service';

function validateAccess(roles: Role[] | '*', allowUI = true) {
  return function (access) {
    const me = access.req.user?.role as Role;

    if (!allowUI && access.req.url === '/api/access' && me !== 'admin')
      return false;

    if (me && roles === '*') return true;

    return me && roles.includes(me);
  };
}

export default validateAccess;
