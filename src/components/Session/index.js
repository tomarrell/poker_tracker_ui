import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import { fetchCurrentSession } from './actions';

import Table from './Table';
import Chart from '../Chart';
import css from './style.css';

const peopleList = [{
  id: 1,
  name: 'Tom',
  buyin: 5,
  walkout: 10,
}, {
  id: 2,
  name: 'Liam',
  buyin: 10,
  walkout: 20,
}, {
  id: 3,
  name: 'Hannah',
  buyin: 15,
  walkout: 10,
}];

const fakeLabels = Array.from({ length: 10 }, (v, i) => i);
const fakeData = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) - 30);

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

    const dt = DateTime.fromISO(session.time);
    console.log(session);

    return (
      <div className={css.newSession}>
        <h2>Session Info</h2>
        <hr />
        <Chart
          title="Bar Chart"
          type="bar"
          data={{
            labels: fakeLabels,
            datasets: [{
              title: 'Some Data',
              values: fakeData,
            }],
          }}
        />
        <Table people={peopleList} />
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
