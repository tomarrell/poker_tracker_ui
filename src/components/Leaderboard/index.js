import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loading from '../Loading';

import { formatCurrency } from '../../utils/money';
import css from './style.css';

const TOP_AWARDS = [
  'first/1st',
  'second/2nd',
  'third/3rd',
];

const BOTTOM_AWARDS = [
  'last',
  '2nd/last',
  '3rd/last',
];

const TOP_3_PLAYERS = [
  {
    id: 1,
    name: 'Liam',
    net: 53,
  },
  {
    id: 2,
    name: 'Tom',
    net: 29,
  },
  {
    id: 3,
    name: 'Hannah',
    net: 23,
  },
];

const BOTTOM_3_PLAYERS = [
  {
    id: 3,
    name: 'Joe',
    net: -12,
  },
  {
    id: 4,
    name: 'Alice',
    net: -28,
  },
  {
    id: 5,
    name: 'Bob',
    net: -39,
  },
];

const Leaderboard = ({ loading, sessions }) => {
  const top3 = TOP_3_PLAYERS;
  const bottom3 = BOTTOM_3_PLAYERS;

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
                <h3 className={css.standoutName}>{person.name}: {formatCurrency(person.net)}</h3>
              </div>
            ))}
          </div>

          {/* BOTTOM 3 */}
          <div className={css.losers}>
            <h3 className={css.title}>BOTTOM 3</h3>
            {bottom3.sort((a, b) => a.net - b.net).map((person, index) => (
              <div key={person.id} className={css.highlightField}>
                <span>{BOTTOM_AWARDS[index]}</span>
                <h3 className={css.standoutName}>{person.name}: {formatCurrency(person.net)}</h3>
              </div>
            ))}
          </div>
        </div>,
        <div className={css.stats}>
          <ul>
            <li>Sessions Played: {sessions.length}</li>
            <li>Total Player Buyins: </li>
            <li>Net Money Transferred: </li>
            <li>Number Unique Players: </li>
            <li>Largest Session (no. of Players): </li>
          </ul>
        </div>
      ]}
    </div>
  );
};

Leaderboard.propTypes = {
  sessions: PropTypes.array,
  loading: PropTypes.bool,
};


export default connect(
  state => ({
    loading: state.overview.loading,
    sessions: state.overview.sessions,
  })
)(Leaderboard);
