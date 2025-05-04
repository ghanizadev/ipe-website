import { CollectionAfterReadHook } from 'payload';

const createVirtualIdHook = (fieldName: string) => {
  const hook: CollectionAfterReadHook = async ({ doc }) => {
    doc[fieldName] = doc.id;
  };

  return hook.bind(this);
};

export default createVirtualIdHook;
