export const CREATE_REALM = 'enter/CREATE_REALM';

export const createRealm = (name, title) => ({
  type: CREATE_REALM,
  payload: {
    name,
    title,
  },
});
