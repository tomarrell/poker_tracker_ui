import {
  createPlayerSchema,
} from '../../api/mutationSchemas';

import { postGQL } from '../../api/utils';

export const createPlayer = (realmId, name) => {
  if (!name) throw new Error('Name must be present to create player');

  return postGQL(createPlayerSchema, {
    realmId,
    name,
  });
}
