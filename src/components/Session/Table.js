import React from 'react';
import PropTypes from 'prop-types';

import { formatCurrency } from '../../utils/money';
import css from './style.css';

const Table = ({ people }) => (
  <table className={css.peopleList}>
    <thead>
      <tr className={css.headRow}>
        <th>Played</th>
        <th>Name</th>
        <th>Buyin</th>
        <th>Walkout</th>
        <th>Net</th>
      </tr>
    </thead>
    <tbody>
      {people.map(playerSession => {
        const { name } = playerSession.player;

        const buyin = playerSession.buyin / 100;
        const walkout = playerSession.walkout / 100;
        const net = (walkout - buyin);

        return (
          <tr key={playerSession.player.id}>
            <td className={css.played}>✔</td>
            <td className={css.name}>{name}</td>
            <td className={css.buyin}>{formatCurrency(buyin)}</td>
            <td className={css.walkout}>{formatCurrency(walkout)}</td>
            <td className={css.net}>{formatCurrency(net)}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

Table.propTypes = {
  people: PropTypes.array,
};

export default Table;
