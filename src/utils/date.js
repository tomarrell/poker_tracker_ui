import { DateTime } from 'luxon';

export const sortDate = (a, b) => {
  const dtA = DateTime.fromISO(a);
  const dtB = DateTime.fromISO(b);

  return dtB.valueOf() - dtA.valueOf();
}
