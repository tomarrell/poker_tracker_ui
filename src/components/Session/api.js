import {
  createPlayerSchema,
} from '../../api/mutationSchemas';

import { postGQL } from '../../api/utils';

export const createPlayer = (name) => {
  if (!name) throw new Error('Name must be present to create player');

  return postGQL(createPlayerSchema, {
    name,
  });
}
