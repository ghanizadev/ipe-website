import { CollectionBeforeOperationHook } from 'payload';
import * as uuid from 'uuid';

const generateImageId: CollectionBeforeOperationHook = ({ operation, req }) => {
  if (operation === 'create') {
    const file = req.file;

    if (!file) throw new Error('No file provided');

    const originalName = file.name;
    const extension = originalName.substring(originalName.lastIndexOf('.'));
    const id = uuid.v4();
    file.name = id + extension;
  }
};

export default generateImageId;
