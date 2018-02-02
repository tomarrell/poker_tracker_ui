import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCurrentSession } from './actions';

import Table from './Table';
import Chart from '../Chart';
import css from './style.css';

const peopleList = [
  {
    id: 1,
    name: 'Tom',
    buyin: 5,
    walkout: 10,
  },
  {
    id: 2,
    name: 'Liam',
    buyin: 10,
    walkout: 20,
  },
  {
    id: 3,
    name: 'Hannah',
    buyin: 15,
    walkout: 10,
  },
];

const fakeLabels = Array.from({ length: 10 }, (v, i) => i);
const fakeData = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) - 30);

class ViewSession extends Component {
  constructor(props) {
    super(props);

    const { match, fetchCurrentSession } = props;

    this.state = {
      sessionId: match.params.id,
    }

    fetchCurrentSession(match.params.id);
  }

  render() {
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
            <span>Session Date: 17/10/2017</span>
          </div>
          <div>
            <span>Session Time: 6:40pm</span>
          </div>
        </form>
        <Link className={css.close} to="/overview">Close</Link>
      </div>
    );
  }
}

ViewSession.propTypes = {
  match: PropTypes.object,
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
