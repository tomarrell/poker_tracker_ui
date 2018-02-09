import React from 'react';
import PropTypes from 'prop-types';

import css from './style.css';
import { DEFAULT_BUYIN } from './constants';

const Table = ({
  players,
  isAddingPerson,
  handleNewPersonChange,
  newPlayerName,
  handleChangePerson,
}) => (
  <table className={css.peopleList}>
    <thead>
      <tr>
        <th>Played</th>
        <th>Name</th>
        <th>Buyin</th>
        <th>Walkout</th>
      </tr>
    </thead>
    <tbody>
      {players.map(player => (
        <tr key={player.id}>
          <td className={css.played}><input type="checkbox" /></td>
          <td className={css.name}>{player.name}</td>
          <td key="buyin" className={css.buyin}>
            {'$'}
            <input
              onChange={event => handleChangePerson(event, 'buyin', player)}
              type="number"
              defaultValue={DEFAULT_BUYIN}
              step={0.10}
              min={0}
            />
          </td>
          <td key="walkout" className={css.walkout}>
            {'$'}
            <input
              onChange={event => handleChangePerson(event, 'walkout', player)}
              type="number"
              step={0.10}
            />
          </td>
        </tr>
      ))}
      
      <tr key="nets">
        <td className={css.played} />
        <td className={css.name}>Totals:</td>
        <td key="buyin" className={css.buyin}>
          {players.reduce((acc, cur) => acc + (cur.buyin || 0), 0)}
        </td>
        <td key="walkout" className={css.walkout}>
          {players.reduce((acc, cur) => acc + (cur.walkout || 0), 0)}
        </td>
      </tr>
     
      {isAddingPerson &&
        <tr key="newPlayer">
          <td className={css.played} />
          <td className={css.newPersonName}>
            <input
              placeholder="Name..."
              onChange={handleNewPersonChange}
              value={newPlayerName}
            />
          </td>
          <td key="buyin" className={css.buyin} />
          <td key="walkout" className={css.walkout} />
        </tr>
      }
    </tbody>
  </table>
);

Table.propTypes = {
  players: PropTypes.array.isRequired,
  isAddingPerson: PropTypes.bool.isRequired,
  newPlayerName: PropTypes.string.isRequired,
  handleNewPersonChange: PropTypes.func.isRequired,
  handleChangePerson: PropTypes.func.isRequired,
};

export default Table;
