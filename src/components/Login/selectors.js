import { createSelector } from 'reselect';

export const realmSelector = createSelector(state => state.login.realm);
