import React from 'react';
import PropTypes from 'prop-types';

import { formatCurrency } from '../../utils/money';
import { toTitleCase } from '../../utils/strings';
import css from './Table.css';

const Table = ({ people }) => {
  return (
    <table className={css.peopleList}>
      <thead>
        <tr className={css.headRow}>
          <th>Name</th>
          <th>History Balance</th>
          <th>Real Balance</th>
          <th>Total Buyin</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => {
          const { id, name, historicalBalance, realBalance, totalBuyin } = person;

          return (
            <tr key={id}>
              <td className={css.name}>{toTitleCase(name)}</td>
              <td className={css.buyin}>{formatCurrency(historicalBalance)}</td>
              <td className={css.walkout}>{formatCurrency(realBalance)}</td>
              <td className={css.net}>{formatCurrency(totalBuyin)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  people: PropTypes.array,
};

export default Table;
