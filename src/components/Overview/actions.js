export const FETCH_REALM_INFO = 'overview/FETCH_REALM_INFO';
export const FETCH_REALM_INFO_SUCCESS = 'overview/FETCH_REALM_INFO_SUCCESS';
export const FETCH_SESSIONS_SUCCESS = 'overview/FETCH_SESSIONS_SUCCESS';
export const FETCH_PLAYERS_SUCCESS = 'overview/FETCH_PLAYERS_SUCCESS';

export const fetchRealmInfo = () => ({
  type: FETCH_REALM_INFO,
});

export const fetchSessionsSuccess = (sessions) => ({
  type: FETCH_SESSIONS_SUCCESS,
  payload: sessions,
});

export const fetchPlayersSuccess = (players) => ({
  type: FETCH_PLAYERS_SUCCESS,
  payload: players,
});

export const fetchRealmInfoSuccess = () => ({
  type: FETCH_REALM_INFO_SUCCESS,
});
