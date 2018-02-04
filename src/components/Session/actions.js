export const CREATE_PLAYER = 'session/CREATE_PLAYER';
export const CREATE_PLAYER_SUCCESS = 'session/CREATE_PLAYER_SUCCESS';

export const CREATE_SESSION_REQUEST = 'session/CREATE_NEW_SESSION';
export const CREATE_SESSION_SUCCESS = 'session/CREATE_SESSION_SUCCESS';

export const FETCH_SESSION = 'session/FETCH_SESSION';
export const FETCH_SESSION_SUCCESS = 'session/FETCH_SESSION_SUCCESS';

export const createPlayer = (name) => ({
  type: CREATE_PLAYER,
  payload: name,
});

export const createPlayerSuccess = (playerId, name) => ({
  type: CREATE_PLAYER_SUCCESS,
  payload: {
    id: playerId,
    name,
  },
});

export const createSessionRequest = (name, time, playerSessions) => ({
  type: CREATE_SESSION_REQUEST,
  payload: {
    name,
    time,
    playerSessions
  },
});

export const createSessionSuccess = (newSession) => ({
  type: CREATE_SESSION_SUCCESS,
  payload: newSession,
});

export const fetchCurrentSession = (sessionId) => ({
  type: FETCH_SESSION,
  payload: {
    sessionId,
  }
});

export const fetchSessionSuccess = (session) => ({
  type: FETCH_SESSION_SUCCESS,
  payload: session,
});
