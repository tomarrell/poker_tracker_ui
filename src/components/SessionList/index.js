import React from 'react';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { sortDate } from '../../utils/date';

import css from './style.css';


const sessionSortDate = (a, b) => sortDate(a.time, b.time);

const SessionList = ({ sessions }) => {

  if (!sessions) return <div>Something went wrong loading sessions!</div>
  if (sessions.length === 0) return <div>No sessions yet!</div>

  return (
    <div className={css.listWrapper}>
      {sessions
        .sort(sessionSortDate)
        .map(s => {
          const dt = DateTime.fromISO(s.time);

          return (
            <div key={s.id} className={css.session}>
              <Link to={`${document.location.pathname}/${s.id}`}>{dt.toHTTP()}</Link>
            </div>
          );
        }
      )}
    </div>
  )
};

SessionList.propTypes = {
  sessions: PropTypes.array,
};

export default SessionList;

