import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import css from './styles.css';

const SessionList = ({ sessions }) => {
  if (!sessions) {
    return <div>Something went wrong loading sessions!</div>
  }

  if (sessions.length === 0) {
    return <div>No sessions yet!</div>
  }


  return sessions.map(s => (
    <div key={s.id} className={css.session}>
      <Link to={`/overview/session/${s.id}`}>{s.time}</Link>
    </div>
  ));
};

SessionList.propTypes = {
  sessions: PropTypes.array,
};

export default SessionList;

