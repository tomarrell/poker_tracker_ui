import React from 'react';
import { Link } from 'react-router-dom';

import { formatCurrency } from '../../utils/money';
import Chart from '../Chart';
import css from './style.css';

const peopleList = [
  {
    id: 1,
    name: 'Tom',
    buyin: 5,
    walkout: 10,
  },
  {
    id: 2,
    name: 'Liam',
    buyin: 10,
    walkout: 20,
  },
  {
    id: 3,
    name: 'Hannah',
    buyin: 15,
    walkout: 10,
  },
];

const renderTable = (people) => (
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
      {people.map(person => {
        const { buyin, walkout, name } = person;
        const net = buyin
          && walkout
          && (walkout - buyin);

        return (
          <tr key={person.id}>
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

const ViewSession = () => {
  return (
    <div className={css.newSession}>
      <h2>Session Info</h2>
      <hr />
      <Chart
        title="Bar Chart"
        type="bar"
        data={{
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          datasets: [{
            title: 'Some Data',
            values: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
          }],
        }}
      />
      {renderTable(peopleList)}
      <form>
        <field>
          <span>Session Date: 17/10/2017</span>
        </field>
        <field>
          <span>Session Time: 6:40pm</span>
        </field>
      </form>
      <Link className={css.close} to="/overview">Close</Link>
    </div>
  );
};

export default ViewSession;
