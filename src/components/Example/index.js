import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import css from './style.css';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={css.example}>
        Hello World!
      </div>
    );
  }
}

Example.propTypes = {};

export default connect(
  null,
  null,
)(Example);
