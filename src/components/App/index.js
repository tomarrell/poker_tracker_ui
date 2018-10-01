import React, { Component } from "react";
import PropTypes from "prop-types";

import css from "./style.css";

export default class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { children } = this.props;

    return <div className={css.app}>{children}</div>;
  }
}

App.propTypes = {
  children: PropTypes.object
};
