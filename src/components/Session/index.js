import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import { fetchCurrentSession } from './actions';

import Table from './Table';
import Chart from '../Chart';
import css from './style.css';

class ViewSession extends Component {
  constructor(props) {
    super(props);

    const { match, fetchCurrentSession: fetchSession } = props;

    this.state = {
      session: {},
    }

    fetchSession(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchCurrentSession: fetchSession } = this.props;

    const nextSessionId = nextProps.match.params.id;
    const thisSessionId = this.props.match.params.id;

    if (nextSessionId !== thisSessionId) {
      fetchSession(nextSessionId);
    }

    this.setState({
      session: nextProps.session,
    });
  }

  render() {
    const { session } = this.state;
    const { playerSessions = [] } = session;

    const dt = DateTime.fromISO(session.time);
    const playerNet = playerSessions.map(ps => (ps.walkout - ps.buyin) / 100);
    const playerLabels = playerSessions.map(ps => ps.player.name);
    // console.log(session);
    // console.log(playerNet, playerLabels);

    return (
      <div className={css.newSession}>
        <h2>Session Info</h2>
        <hr />
        {playerNet.length && <Chart
          key={session.id}
          title="Bar Chart"
          type="bar"
          data={{
            labels: playerLabels,
            datasets: [{
              values: playerNet,
            }],
          }}
        />}
        <Table people={playerSessions || []} />
        <form>
          <div>
            <strong>Session Date: </strong>
            {dt.toLocaleString(DateTime.DATE_HUGE)}
          </div>
          <div>
            <strong>Session Time: </strong>
            {dt.toLocaleString(DateTime.TIME_SIMPLE)}
          </div>
        </form>
        <Link className={css.close} to="/overview">Close</Link>
      </div>
    );
  }
}

ViewSession.propTypes = {
  match: PropTypes.object,
  session: PropTypes.object,
  fetchCurrentSession: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    session: state.session.currentSession,
  }),
  dispatch => ({
    fetchCurrentSession: (sessionId) => dispatch(fetchCurrentSession(sessionId)),
  }),
)(ViewSession);
