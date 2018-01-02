import {
  createPlayerSchema,
  createSessionSchema,
} from '../../api/mutationSchemas';

import { postGQL } from '../../api/utils';

export const createPlayer = (realmId, name) => {
  if (!realmId) throw new Error('RealmId must be present to create player');
  if (!name) throw new Error('Name must be present to create player');

  return postGQL(createPlayerSchema, {
    realmId,
    name,
  });
};

export const createSession = (realmId, name, time, playerSessions) => {
  if (!realmId) throw new Error('RealmId must be present to create session');
  if (!time) throw new Error('Time must be present to create session');
  if (!playerSessions) throw new Error('PlayerSessions must be present to create session');

  return postGQL(createSessionSchema, {
    realmId,
    name,
    time,
    playerSessions,
  });
};



