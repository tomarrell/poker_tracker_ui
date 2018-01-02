export const CREATE_PLAYER = 'session/CREATE_PLAYER';
export const CREATE_PLAYER_SUCCESS = 'session/CREATE_PLAYER_SUCCESS';

export const CREATE_SESSION = 'session/CREATE_NEW_SESSION';

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

export const createSession = (name, time, playerSessions) => ({
  type: CREATE_SESSION,
  payload: {
    name,
    time,
    playerSessions
  },
});
