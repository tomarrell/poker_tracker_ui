import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SessionList from './SessionList';
import { sessionsSelector } from '../Overview/selectors';

import css from './style.css';

const Sidebar = ({ sessions }) => {
  return (
    <div className={css.sidebar}>
      <div className={css.header}>
        <h2>Sessions</h2>
        <Link to="/overview/new" className={css.newSession}>New</Link>
      </div>
      <hr />
      <SessionList sessions={sessions} />
    </div>
  );
};

Sidebar.propTypes = {
  sessions: PropTypes.array,
};

export default connect(
  (state) => ({
    sessions: sessionsSelector(state),
  }),
  null,
)(Sidebar);

