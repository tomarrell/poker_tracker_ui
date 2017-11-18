import React, { Component } from 'react';

import Sidebar from '../Sidebar';

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
        <div className={css.content}>
          Content
        </div>
      </div>
    );
  }
}
