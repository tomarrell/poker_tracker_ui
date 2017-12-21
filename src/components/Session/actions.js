export const CREATE_PLAYER = 'session/CREATE_PLAYER';
export const CREATE_PLAYER_SUCCESS = 'session/CREATE_PLAYER_SUCCESS';

export const createPlayer = (name) => ({
  type: CREATE_PLAYER,
  payload: name,
});

export const createPlayerSuccess = (name) => ({
  type: CREATE_PLAYER_SUCCESS,
  payload: name,
});
