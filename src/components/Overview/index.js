import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchRealmInfo } from './actions';

import Sidebar from '../Sidebar';
import Leaderboard from '../Leaderboard';
import ViewSession from '../Session';
import NewSession from '../Session/NewSession';

import css from './style.css';

class Overview extends Component {
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
        <Switch>
          <Route exact path={`${match.url}/:realmName`} component={Leaderboard} />
          <Route path={`${match.url}/new`} component={NewSession} />
          <Route path={`${match.url}/session/:id`} component={ViewSession} />
        </Switch>
      </div>
    );
  }
}

Overview.propTypes = {
  match: PropTypes.object,
};

export default connect(
  null,
  dispatch => ({
    fetchRealmInfo: () => dispatch(fetchRealmInfo()),
  }),
)(Overview);
