import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchRealmInfo } from './actions';

import Sidebar from '../Sidebar';
import Leaderboard from '../Leaderboard';
import ViewSession from '../Session';
import NewSession from '../NewSession';

import css from './style.css';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchRealmInfo();
  }

  render() {
    const { match } = this.props;

    return (
      <div className={css.overview}>
        <Route path={`${match.url}/:realmName`} component={Sidebar} />
        <Switch>
          <Route exact path={`${match.url}/:realmName/new`} component={NewSession} />
          <Route exact path={`${match.url}/:realmName/:id`} component={ViewSession} />
          <Route exact path={`${match.url}/:realmName`} component={Leaderboard} />
        </Switch>
        <Route path="/" component={null} />
      </div>
    );
  }
}

Overview.propTypes = {
  fetchRealmInfo: PropTypes.func.isRequired,
  match: PropTypes.object,
};

export default connect(
  null,
  dispatch => ({
    fetchRealmInfo: () => dispatch(fetchRealmInfo()),
  }),
)(Overview);
