import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loading from '../Loading';

import { formatCurrency } from '../../utils/money';
import css from './style.css';

const TOP_AWARDS = ['first/1st', 'second/2nd', 'third/3rd'];

const BOTTOM_AWARDS = ['last', '2nd/last', '3rd/last'];

const Leaderboard = ({ loading, sessions, players }) => {
  const sortByHistoricalBalance = players.sort(
    (p1, p2) => p2.historicalBalance - p1.historicalBalance,
  );
  const top3 = sortByHistoricalBalance.slice(0, 3);
  const bottom3 = sortByHistoricalBalance
    .slice(sortByHistoricalBalance.length - 3)
    .reverse();

  const netGains = players.reduce((acc, p) => acc + (p.historicalBalance < 0 ? 0 : p.historicalBalance), 0);
  const totalBuyins = players.reduce((acc, p) => acc + p.totalBuyin, 0);
  const largestSess = sessions.reduce((max, p) =>  p.playerSessions.length > max ? p.playerSessions.length : max, 0);

  return (
    <div className={css.leaderboard}>
      <h2>Leaderboard</h2>
      <hr />
      <Loading
        className={css.loadingPosition}
        isLoading={loading}
      />

      {/* Content */}
      {!loading &&
        <div className={css.wrapper}>
          <div key={1} className={css.content}>
            <div className={css.champs}>
              <h3 className={css.title}>TOP 3</h3>
              {top3.map((person, index) => (
                <div key={index} className={css.highlightField}>
                  <span>{TOP_AWARDS[index]}</span>
                  <h3 className={css.standoutName}>
                    {person.name}: {formatCurrency(person.historicalBalance)}
                  </h3>
                </div>
              ))}
            </div>

            {/* BOTTOM 3 */}
            <div className={css.losers}>
              <h3 className={css.title}>BOTTOM 3</h3>
              {bottom3.map((person, index) => (
                <div key={index} className={css.highlightField}>
                  <span>{BOTTOM_AWARDS[index]}</span>
                  <h3 className={css.standoutName}>
                    {person.name}: {formatCurrency(person.historicalBalance)}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <div className={css.stats}>
            <ul>
              <li>Sessions Played: {sessions.length}</li>
              <li>Total Player Buyins: {formatCurrency(totalBuyins)}</li>
              <li>Net Money Transferred: {formatCurrency(netGains)} </li>
              {/* TODO fix dup player issues... */}
              <li>Number Unique Players: {players.length} </li>
              <li>Largest Session (no. of Players): {largestSess} </li>
            </ul>
          </div>
        </div>
      }
    </div>
  );
};

Leaderboard.propTypes = {
  sessions: PropTypes.array,
  players: PropTypes.array,
  loading: PropTypes.bool,
};

export default connect(state => ({
  loading: state.overview.loading,
  sessions: state.overview.sessions,
  players: state.overview.players,
}))(Leaderboard);
