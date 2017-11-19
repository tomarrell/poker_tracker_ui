import React from 'react';

import css from './style.css';

const peopleList = [
  { name: 'Tom' },
  { name: 'Liam' },
  { name: 'Hannah' },
];

const DEFAULT_BUYIN = 5;

const renderTable = (people) => (
  <table className={css.peopleList}>
    <thead>
      <th>Played</th>
      <th>Name</th>
      <th>Buyin</th>
      <th>Walkout</th>
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
          $<input type="number" value={DEFAULT_BUYIN} step={0.01} min={0} />
        </td>
        <td className={css.walkout}>
          $<input type="number" step={0.01} />
        </td>
      </tr>
    ))}
  </table>
);

const NewSession = () => {
  return (
    <div className={css.newSession}>
      <h2>New Session</h2>
      <hr />
      {renderTable(peopleList)}
      <button className={css.newPerson}>+ Add person</button>
      <form>
        <field>
          <span>Session Date:* </span>
          <input type="date" className={css.dateField} required />
        </field>
        <field>
          <span>Session Time: </span>
          <input type="date" className={css.dateField} />
        </field>
        <button type="submit">Create Session ✔</button>
      </form>
    </div>
  );
};

export default NewSession;
