import {
  getSessionsByRealmIdSchema,
  getPlayersByRealmIdSchema,
} from '../../api/querySchemas';

import { postGQL } from '../../api/utils';

export const fetchSessionsByRealmId = (realmId) => {
  if (!realmId) throw new Error('RealmId must be present to fetch sessions');

  return postGQL(getSessionsByRealmIdSchema, {
    realmId,
  });
}

export const fetchPlayersByRealmId = (realmId) => {
  if (!realmId) throw new Error('RealmId must be present to fetch players');

  return postGQL(getPlayersByRealmIdSchema, {
    realmId,
  });
}
