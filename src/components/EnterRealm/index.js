import React from 'react';

import css from './style.css';

const REALMS = [
  'Movio',
  'Skycity',
  'Home Tournament',
];

const EnterRealm = () =>  {
  const realms = REALMS;
  return (
    <div className={css.enterRealm}>
      <form>
        <span>Enter Realm</span>
        <input />
        <button type="submit">Submit</button>
      </form>

      <h3 className={css.recentTitle}>Recent Realms</h3>
      <ul className={css.previousRealms}>
        {realms.map(realm => (
          <li><button>{realm}</button></li>
        ))}
      </ul>
    </div>
  );
}

export default EnterRealm;
