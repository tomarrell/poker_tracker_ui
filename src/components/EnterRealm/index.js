import React, { Component } from 'react';

import {
  getRecentRealms,
  addRecentRealm,
} from '../../utils/localstorage';
import { createRealm } from './api';

import css from './style.css';

export default class EnterRealm extends Component {
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
    const { history } = this.props;

    // TODO take realm title during realm creation
    createRealm(realm, undefined);
    await addRecentRealm(realm)
    history.push(`/overview/${realm}`)
  }

  render() {
    const { realm: realmInput } = this.state;
    const realms = getRecentRealms() || [];

    return (
      <div className={css.enterRealm}>
        <form>
          <span>Enter Realm</span>
          <input onChange={this.handleInputChange('realm')} placeholder="Realm" />
          {realmInput.length > 0 &&
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
          {realms.map((realm, index) => (
            <li key={index}><button>{realm}</button></li>
          ))}
        </ul>
      </div>
    );
  }
}
