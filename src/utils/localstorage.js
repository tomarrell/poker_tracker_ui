const storage = window.localStorage;
const RECENT_REALMS = 'recent_realms';
const RECENT_REALM_LENGTH = 5;

const setCookie = (key, value) => {
  if (typeof key !== 'string') {
    throw new Error('Localstorage key must be string');
  }

  storage.setItem(key, JSON.stringify(value));
}

const getCookie = (key) => {
  if (typeof key !== 'string') {
    throw new Error('Localstorage key must be string');
  }

  return JSON.parse(storage.getItem(key));
}

export const addRecentRealm = (id, name, title) => {
  let recentRealms = getCookie(RECENT_REALMS) || [];

  recentRealms.unshift({ id, name, title });
  recentRealms = recentRealms.slice(0, RECENT_REALM_LENGTH);

  setCookie(RECENT_REALMS, recentRealms);
};

export const getRecentRealms = () => {
  return getCookie(RECENT_REALMS);
}
