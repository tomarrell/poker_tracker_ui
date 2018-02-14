import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loading from '../Loading';

import { formatCurrency } from '../../utils/money';
import css from './style.css';

const TOP_AWARDS = ['first/1st', 'second/2nd', 'third/3rd'];

const BOTTOM_AWARDS = ['last', '2nd/last', '3rd/last'];

const Leaderboard = ({ loading, realm }) => {
  const sortByHistoricalBalance = realm.players.sort(
    (p1, p2) => p2.historicalBalance - p1.historicalBalance,
  );
  const top3 = sortByHistoricalBalance.slice(0, 3);
  const bottom3 = sortByHistoricalBalance.slice(
    sortByHistoricalBalance.length - 3,
  );

  // TODO: calculate stats from sessions/playerSessions

  return (
    <div className={css.leaderboard}>
      <h2>Leaderboard</h2>
      <hr />
      <Loading isLoading={loading} />

      {/* Content */}
      {!loading && [
        <div className={css.content}>
          <div className={css.champs}>
            <h3 className={css.title}>TOP 3</h3>
            {top3.sort((a, b) => b.net - a.net).map((person, index) => (
              <div key={person.id} className={css.highlightField}>
                <span>{TOP_AWARDS[index]}</span>
                <h3 className={css.standoutName}>
                  {person.name}: {formatCurrency(person.net)}
                </h3>
              </div>
            ))}
          </div>

          {/* BOTTOM 3 */}
          <div className={css.losers}>
            <h3 className={css.title}>BOTTOM 3</h3>
            {bottom3.sort((a, b) => a.net - b.net).map((person, index) => (
              <div key={person.id} className={css.highlightField}>
                <span>{BOTTOM_AWARDS[index]}</span>
                <h3 className={css.standoutName}>
                  {person.name}: {formatCurrency(person.net)}
                </h3>
              </div>
            ))}
          </div>
        </div>,
        <div className={css.stats}>
          <ul>
            <li>Sessions Played: {realm.sessions.length}</li>
            <li>Total Player Buyins:</li>
            <li>Net Money Transferred: </li>
            <li>Number Unique Players: {realm.players.length} </li>
            <li>Largest Session (no. of Players): </li>
          </ul>
        </div>,
      ]}
    </div>
  );
};

Leaderboard.propTypes = {
  realm: PropTypes.object,
  loading: PropTypes.bool,
};

export default connect(state => ({
  loading: state.overview.loading,
  realm: state.overview.realm,
}))(Leaderboard);
