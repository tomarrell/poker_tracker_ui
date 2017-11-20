import React from 'react';
import { Link } from 'react-router-dom';

import css from './style.css';

const sessions = [
  {
    id: 1,
    date: 'Fri 17th Oct',
  },
  {
    id: 2,
    date: 'Fri 24th Oct',
  },
];

const constructSessions = (sessionsArray) => {
  return sessionsArray.map((session) => (
    <div key={session.id} className={css.session}>
      <Link to={`/overview/${session.id}`}>{session.date}</Link>
    </div>
  ));
};

const Sidebar = () => {
  return (
    <div className={css.sidebar}>
      <div className={css.header}>
        <h2>Sessions</h2>
        <Link to="/overview/new" className={css.newSession}>New</Link>
      </div>
      <hr />
      {constructSessions(sessions)}
    </div>
  );
};

export default Sidebar;
