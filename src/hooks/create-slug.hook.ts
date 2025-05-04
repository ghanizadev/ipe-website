import { CollectionBeforeChangeHook } from 'payload';
import slugify from 'slugify';

const createSlugHook = (from: string, to = 'slug') => {
  const hook: CollectionBeforeChangeHook = ({ data }) => {
    data[to] = slugify(data[from]).toLowerCase();
  };

  return hook;
};

export default createSlugHook;
