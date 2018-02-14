// import { createSelector } from 'reselect';

export const playersSelector = state => state.overview.players;
export const sessionsSelector = state => state.overview.sessions;
export const realmSelector = state => state.overview.realm;
export const loadingSelector = state => state.overview.loading;
