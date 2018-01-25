import React from 'react';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import css from './style.css';

const SessionList = ({ sessions }) => {
  if (!sessions) {
    return <div>Something went wrong loading sessions!</div>
  }

  if (sessions.length === 0) {
    return <div>No sessions yet!</div>
  }

  return sessions.reverse().map(s => {
    const dt = DateTime.fromISO(s.time);

    return (
      <div key={s.id} className={css.session}>
        <Link to={`/overview/session/${s.id}`}>{dt.toHTTP()}</Link>
      </div>
    );
  });
};

SessionList.propTypes = {
  sessions: PropTypes.array,
};

export default SessionList;

