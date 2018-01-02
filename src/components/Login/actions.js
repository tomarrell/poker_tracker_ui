export const CREATE_REALM = 'login/CREATE_REALM';
export const SUCCESS_ENTER_REALM = 'login/SUCCESS_ENTER_REALM';

export const createRealm = (name, title) => ({
  type: CREATE_REALM,
  payload: {
    name,
    title,
  },
});

export const successEnterRealm = (id, name, title) => ({
  type: SUCCESS_ENTER_REALM,
  payload: {
    id,
    name,
    title,
  },
});
