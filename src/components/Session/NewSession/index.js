import React from 'react';
import classnames from 'classnames';

import css from './style.css';

const people = [
  { name: 'Tom' },
  { name: 'Liam' },
  { name: 'Hannah' },
];

const NewSession = () => {
  return (
    <div className={css.newSession}>
      <h2>New Session</h2>
      <hr />
      <table className={css.peopleList}>
        <thead>
          <tr>
            <th>Played</th>
            <th>Name</th>
            <th>Buyin</th>
            <th>Walkout</th>
          </tr>
        </thead>
        {people.map(person => (
          <tr>
            <td className={css.checkbox}>
              <input type="checkbox" />
            </td>
            <td className={css.name}>
              {person.name}
            </td>
            <td className={css.buyin}>
              $<input type="number" />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default NewSession;
