import React, { Component } from 'react';

import css from './style.css';

const REALMS = [
  {
    id: 1,
    title: 'Movio',
  },
  {
    id: 2,
    title: 'Skycity',
  },
  {
    id: 3,
    title: 'Home Tournament',
  }
];

export default class EnterRealm extends Component {
  constructor() {
    super()

    this.state = {
      realm: '',
      password: '',
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

  createRealm() {
    console.log('Create Realm');
  }

  loginRealm() {
    console.log('Login Realm');
  }

  render() {
    const { realm: realmInput } = this.state;
    const realms = REALMS;

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
          <button className={css.createRealm}>+ Create</button>
        </form>

        <h3 className={css.recentTitle}>Recent Realms</h3>
        <ul className={css.previousRealms}>
          {realms.map(realm => (
            <li key={realm.id}><button>{realm.title}</button></li>
          ))}
        </ul>
      </div>
    );
  }
}
