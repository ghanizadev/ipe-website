import isAdmin from './is-admin';

const adminAccess = {
  create: isAdmin,
  read: isAdmin,
  delete: isAdmin,
  readVersions: isAdmin,
  unlock: isAdmin,
  update: isAdmin,
};

export default adminAccess;
