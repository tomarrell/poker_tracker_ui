import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import { fetchCurrentSession } from './actions';
import { toTitleCase } from '../../utils/strings';

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
    const { match } = this.props;
    const { session } = this.state;
    const { playerSessions = [] } = session;

    const dt = DateTime.fromISO(session.time);
    const ps = playerSessions.sort((a, b) => (b.walkout - b.buyin) - (a.walkout - a.buyin));
    const playerNet = ps.map(p => (p.walkout - p.buyin) / 100);
    const playerLabels = ps.map(p => toTitleCase(p.player.name));

    return (
      <div className={css.newSession}>
        <h2>Session Info</h2>
        <hr />
        {playerNet.length && <Chart
          key={session.id}
          title="Net Winnings by Player"
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
        <Link
          className={css.close}
          to={`${match.url.replace(`/${match.params.id}`, '')}`}
        >
          Close
        </Link>
      </div>
    );
  }
}

ViewSession.propTypes = {
  fetchCurrentSession: PropTypes.func.isRequired,
  match: PropTypes.object,
  session: PropTypes.object,
};

export default connect(
  state => ({
    session: state.session.currentSession,
  }),
  dispatch => ({
    fetchCurrentSession: (sessionId) => dispatch(fetchCurrentSession(sessionId)),
  }),
)(ViewSession);
