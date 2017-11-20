import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Sidebar from '../Sidebar';
import Leaderboard from '../Leaderboard';
import ViewSession from '../Session';
import NewSession from '../Session/NewSession';

import css from './style.css';

export default class Overview extends Component {
  constructor() {
    super()

    this.state = {
    };
  }

  render() {
    const { match } = this.props;

    return (
      <div className={css.overview}>
        <Sidebar />
        <Route exact path={`${match.url}`} component={Leaderboard} />
        <Route path={`${match.url}/:id`} component={ViewSession} />
        <Route path={`${match.url}/new`} component={NewSession} />
      </div>
    );
  }
}

Overview.propTypes = {
  match: PropTypes.object,
};
