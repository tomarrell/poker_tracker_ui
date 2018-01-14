import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    const { dispatchLoginRealm, history } = this.props;

    await dispatchLoginRealm(realm);
    history.push(`/overview/${realm}`);
  }

  createRealm = async () => {
    const { realm } = this.state;
    const { dispatchCreateRealm, history } = this.props;

    // TODO take realm title during realm creation
    await dispatchCreateRealm(realm, undefined);
    history.push(`/overview/${realm}`);
  }

  render() {
    const { realm } = this.state;
    const realms = getRecentRealms() || [];

    return (
      <div className={css.enterRealm}>
        <form>
          <span>Enter Realm</span>
          <input onChange={this.handleInputChange('realm')} placeholder="Realm" />
          {realm.length > 0 &&
            <input
              onChange={this.handleInputChange('password')}
              placeholder="Password"
              type="password"
            />}
          <button onClick={this.loginRealm}>Login</button>
          <button onClick={this.createRealm} className={css.createRealm}>+ Create</button>
        </form>

        <h3 className={css.recentTitle}>Recent Realms</h3>
        <ul className={css.previousRealms}>
          {realms.map((realmData, index) => (
            <li key={index}>
              <button>
                {realmData.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    dispatchLoginRealm: (name) => dispatch(loginRealm(name)),
    dispatchCreateRealm: (name, title) => dispatch(createRealm(name, title)),
  }),
)(Login);
