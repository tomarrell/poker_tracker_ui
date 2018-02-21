import { getExampleQuery } from '../../api/querySchemas';

import { postGQL } from '../../api/utils';

export const fetchExample = id => {
  if (!id) throw new Error('Id must be present to fetch sessions');

  return postGQL(getExampleQuery, {
    id,
  });
};
