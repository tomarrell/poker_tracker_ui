import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getRecentRealms } from '../../utils/localstorage';

import { createRealm, loginRealm } from './actions';

import css from './style.css';

class Login extends Component {
  constructor() {
    super()

    this.state = {
      realm: '',
      // TODO add password for login
      // password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(name) {
    return (event) => {
      this.setState({
        [name]: event.target.value,
      });
    }
  }

  loginRealm = async () => {
    const { realm } = this.state;
    const { dispatchLoginRealm } = this.props;

    dispatchLoginRealm(realm);
  }

  createRealm = async () => {
    const { realm } = this.state;
    const { dispatchCreateRealm } = this.props;

    // TODO take realm title during realm creation
    dispatchCreateRealm(realm, undefined);
  }

  handleRealmSelect = (name) => () => {
    this.setState({
      realm: name,
    });
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.loginRealm();
    }
  }

  render() {
    const { realm } = this.state;
    const { isLoading } = this.props;
    const realms = getRecentRealms() || [];

    return (
      <div className={css.enterRealm}>
        <div>
          <span>Enter Realm</span>
          <input onChange={this.handleInputChange('realm')} onKeyPress={this.handleKeyDown} placeholder="Realm" value={realm} />
          {realm.length > 0 &&
            <input
              onChange={this.handleInputChange('password')}
              placeholder="Password"
              type="password"
            />}
          <button onClick={this.loginRealm}>Login</button>
          <button onClick={this.createRealm} className={css.createRealm}>+ Create</button>
          {isLoading &&
            <div>
              <i className={classnames("zmdi zmdi-spinner", css.spinner)} />
            </div>
          }
        </div>

        <h3 className={css.recentTitle}>Recent Realms</h3>
        <ul className={css.previousRealms}>
          {realms.map((realmData, index) => (
            <li key={index}>
              <button onClick={this.handleRealmSelect(realmData.name)}>
                {realmData.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchLoginRealm: PropTypes.func,
  dispatchCreateRealm: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default connect(
  state => ({
    isLoading: state.login.loading,
  }),
  (dispatch) => ({
    dispatchLoginRealm: (name) => dispatch(loginRealm(name)),
    dispatchCreateRealm: (name, title) => dispatch(createRealm(name, title)),
  }),
)(Login);
