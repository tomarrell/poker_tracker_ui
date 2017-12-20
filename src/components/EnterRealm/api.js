import { createRealmSchema } from '../../api/mutationSchemas';
import { postGQL } from '../../api/utils';

export const createRealm = (name, title) => {
  if (!name) throw new Error('Name must be present to create Realm');

  return postGQL(createRealmSchema, {
    name,
    title,
  });
};


