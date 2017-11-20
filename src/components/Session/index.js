import React from 'react';

import css from './style.css';

const peopleList = [
  {
    name: 'Tom',
    buyin: 5,
    walkout: 10,
  },
  {
    name: 'Liam',
    buyin: 10,
    walkout: 20,
  },
  {
    name: 'Hannah',
    buyin: 15,
    walkout: 10,
  },
];

const renderTable = (people) => (
  <table className={css.peopleList}>
    <thead>
      <th>Played</th>
      <th>Name</th>
      <th>Buyin</th>
      <th>Walkout</th>
      <th>Net</th>
    </thead>
    {people.map(person => {
      const { buyin, walkout, name } = person;

      return (
        <tr>
          <td className={css.played}>✔</td>
          <td className={css.name}>{name}</td>
          <td className={css.buyin}>
            $<span>{buyin}</span>
          </td>
          <td className={css.walkout}>
            $<span>{walkout}</span>
          </td>
          <td className={css.net}>
            $<span>{
              (buyin && walkout && walkout - buyin) || 'N/A'
            }</span>
          </td>
        </tr>
      );
    })}
  </table>
);

const NewSession = () => {
  return (
    <div className={css.newSession}>
      <h2>New Session</h2>
      <hr />
      {renderTable(peopleList)}
      <form>
        <field>
          <span>Session Date: 17/10/2017</span>
        </field>
        <field>
          <span>Session Time: 6:40pm</span>
        </field>
      </form>
    </div>
  );
};

export default NewSession;
