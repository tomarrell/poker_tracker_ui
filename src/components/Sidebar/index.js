import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SessionList from './SessionList';
import { realmSelector } from '../Overview/selectors';

import css from './style.css';

const Sidebar = ({ realm }) => {
  return (
    <div className={css.sidebar}>
      <div className={css.header}>
        <h2>Sessions</h2>
        <Link to="/overview/new" className={css.newSession}>
          New
        </Link>
      </div>
      <hr />
      <SessionList sessions={realm.sessions} />
    </div>
  );
};

Sidebar.propTypes = {
  realm: PropTypes.object,
};

export default connect(
  state => ({
    realm: realmSelector(state),
  }),
  null,
)(Sidebar);
