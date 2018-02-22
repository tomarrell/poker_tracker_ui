import React from 'react';
import classnames from 'classnames';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { sortDate } from '../../utils/date';

import css from './style.css';


const sessionSortDate = (a, b) => sortDate(a.time, b.time);

const SessionList = ({ sessions, currentSessionId, match }) => {

  if (!sessions) return <div>Something went wrong loading sessions!</div>
  if (sessions.length === 0) return <div>No sessions yet!</div>

  return (
    <div className={css.listWrapper}>
      {sessions
        .sort(sessionSortDate)
        .map(s => {
          const dt = DateTime.fromISO(s.time);

          return (
            <div
              key={s.id}
              className={classnames(
                css.session,
                { [css.bold]: s.id === Number(currentSessionId) },
              )}
            >
              <Link to={`${match.url}/${s.id}`}>{dt.toHTTP()}</Link>
            </div>
          );
        }
      )}
    </div>
  )
};

SessionList.propTypes = {
  match: PropTypes.object.isRequired,
  currentSessionId: PropTypes.string,
  sessions: PropTypes.array,
};

export default SessionList;

