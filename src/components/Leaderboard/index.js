import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loading from '../Loading';
import Champs from '../Champs';
import Table from './Table';

import { formatCurrency } from '../../utils/money';
import css from './style.css';

const Leaderboard = ({ loading, sessions, players }) => {
  const sortByHistoricalBalance = players
    .sort((p1, p2) => p2.historicalBalance - p1.historicalBalance);
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

      {!loading &&
        <div className={css.wrapper}>
          <Champs
            champs={top3}
            title="TOP 3"
            type="top"
          />

          <Table
            people={players}
          />

          <ul className={css.stats}>
            <li>Sessions Played: {sessions.length}</li>
            <li>Total Player Buyins: {formatCurrency(totalBuyins)}</li>
            <li>Net Money Transferred: {formatCurrency(netGains)} </li>
            <li>Number Unique Players: {players.length} </li>
            <li>Largest Session (no. of Players): {largestSess} </li>
          </ul>
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
