import React from 'react';

import css from './style.css';

const TOP_AWARDS = [
  'first/1st',
  'second/2nd',
  'third/3rd',
];

const BOTTOM_AWARDS = [
  '3rd/last',
  '2nd/last',
  'last',
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

const Leaderboard = () => {
  const top3 = TOP_3_PLAYERS;
  const bottom3 = BOTTOM_3_PLAYERS;

  return (
    <div className={css.leaderboard}>
      <h2>Leaderboard</h2>
      <hr />

      {/* Content */}
      <div className={css.content}>
        {/* TOP 3 */}
        <div className={css.champs}>
          <h3 className={css.title}>TOP 3</h3>
          {top3.map((person, index) => (
            <field className={css.highlightField}>
              <span>{TOP_AWARDS[index]}</span>
              <h3 className={css.standoutName}>{person.name} - ${person.net}</h3>
            </field>
          ))}
        </div>

        {/* BOTTOM 3 */}
        <div className={css.losers}>
          <h3 className={css.title}>Bottom 3</h3>
          {bottom3.map((person, index) => (
            <field className={css.highlightField}>
              <span>{BOTTOM_AWARDS[index]}</span>
              <h3 className={css.standoutName}>{person.name} - ${person.net}</h3>
            </field>
          ))}
        </div>
      </div>

      {/* Losing */}
      <div className={css.stats}>
        Stats
      </div>
    </div>
  );
};

export default Leaderboard;
