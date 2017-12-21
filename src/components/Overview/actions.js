export const FETCH_REALM_INFO = 'overview/FETCH_REALM_INFO';
export const FETCH_SESSIONS_SUCCESS = 'overview/FETCH_SESSIONS_SUCCESS';
export const FETCH_PLAYERS_SUCCESS = 'overview/FETCH_PLAYERS_SUCCESS';

export const fetchRealmInfo = () => {
  return {
    type: FETCH_REALM_INFO,
  };
};

export const fetchSessionsSuccess = (sessions) => {
  return {
    type: FETCH_SESSIONS_SUCCESS,
    payload: sessions,
  };
}

export const fetchPlayersSuccess = (players) => {
  return {
    type: FETCH_PLAYERS_SUCCESS,
    payload: players,
  };
}
