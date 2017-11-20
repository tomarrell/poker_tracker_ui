import React from 'react';
import { Prompt } from 'react-router-dom';

import css from './style.css';

const peopleList = [
  {
    id: 1,
    name: 'Tom'
  },
  {
    id: 2,
    name: 'Liam'
  },
  {
    id: 3,
    name: 'Hannah'
  },
];

const DEFAULT_BUYIN = 5;

const renderTable = (people) => (
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
      {people.map(person => (
        <tr key={person.id}>
          <td className={css.played}>
            <input type="checkbox" />
          </td>
          <td className={css.name}>
            {person.name}
          </td>
          <td className={css.buyin}>
            $<input type="number" defaultValue={DEFAULT_BUYIN} step={0.01} min={0} />
          </td>
          <td className={css.walkout}>
            $<input type="number" step={0.01} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const NewSession = () => {
  return (
    <div className={css.newSession}>
      <Prompt 
        when
        message="Are you sure you want to leave?"
      />
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
        <button className={css.create} type="submit">Create Session ✔</button>
      </form>
    </div>
  );
};

export default NewSession;
