import React, { Component } from 'react';
import { connect } from 'react-redux';

import { dispatchExampleAction } from './actions';
import { exampleSelector } from './selectors';

import TestComponent from '../Container';

import css from './style.css';

const ComponentThing = () => <div>Loading...</div>;

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={css.example}>
        <div>Hello World!</div>
        <TestComponent
          action={dispatchExampleAction({ test: 'test' })}
          selector={exampleSelector}
          altComponent={ComponentThing}
        />
      </div>
    );
  }
}

Example.propTypes = {};

export default connect(
  null,
  null,
)(Example);
