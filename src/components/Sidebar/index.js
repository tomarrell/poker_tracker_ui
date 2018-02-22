import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SessionList from '../SessionList';
import { sessionsSelector } from '../Overview/selectors';
import { currentSession } from '../Session/selectors';

import css from './style.css';

const Sidebar = ({ sessions, activeSession, match }) => {
  return (
    <div className={css.sidebar}>
      <div className={css.header}>
        <h2>Sessions</h2>
        <Link to={`${match.url}/new`} className={css.newSession}>
          New
        </Link>
      </div>
      <hr />
      <SessionList
        match={match}
        sessions={sessions}
        currentSessionId={activeSession && activeSession.id}
      />
    </div>
  );
};

Sidebar.propTypes = {
  match: PropTypes.object.isRequired,
  activeSession: PropTypes.object,
  sessions: PropTypes.array,
};

export default connect(
  state => ({
    sessions: sessionsSelector(state),
    activeSession: currentSession(state),
  }),
  null,
)(Sidebar);
