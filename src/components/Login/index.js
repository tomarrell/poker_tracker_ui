import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getRecentRealms,
  addRecentRealm,
} from '../../utils/localstorage';

import { createRealm } from './actions';

import css from './style.css';

class Login extends Component {
  constructor() {
    super()

    this.state = {
      realm: '',
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
          <button type="submit">Login</button>
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
    dispatchCreateRealm: (name, title) => dispatch(createRealm(name, title)),
  }),
)(Login);
