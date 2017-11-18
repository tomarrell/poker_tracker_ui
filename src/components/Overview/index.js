import React, { Component } from 'react';

import Sidebar from '../Sidebar';
// import Leaderboard from '../Leaderboard';
import NewSession from '../Session/NewSession';

import css from './style.css';

export default class Overview extends Component {
  constructor() {
    super()
    
    this.state = {
    };
  }

  render() {
    return (
      <div className={css.overview}>
        <Sidebar />
        <NewSession />
      </div>
    );
  }
}
