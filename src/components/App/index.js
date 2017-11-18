import React, { Component } from 'react';

// import EnterRealm from '../EnterRealm';
import Overview from '../Overview';
import css from './style.css';

export default class App extends Component {
  constructor() {
    super()

    this.state = {
    };
  }

  render() {
    return (
      <div className={css.app}>
        <Overview />
      </div>
    );
  }
}

