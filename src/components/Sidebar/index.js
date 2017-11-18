import React from 'react';

import css from './style.css';

const sessions = [
  {
    date: 'Fri 17th Oct',
  },
  {
    date: 'Fri 24th Oct',
  },
];

const constructSessions = (sessionsArray) => {
  return sessionsArray.map((session) => {
    return (
      <div className={css.session}>
        <div>{session.date}</div>
      </div>
    );
  });
};

const Sidebar = () => {
  return (
    <div className={css.sidebar}>
      <div className={css.header}>
        <h2>Sessions</h2>
        <button>New</button>
      </div>
      <hr />
      {constructSessions(sessions)}
    </div>
  );
};

export default Sidebar;
