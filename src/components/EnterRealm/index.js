import React from 'react';

import css from './style.css';

const EnterRealm = () =>  {
  return (
    <div className={css.enterRealm}>
      <form>
        <span>Enter Realm</span>
        <input />
        <button type="submit">Submit</button>
      </form>

      <ul className={css.previousRealms}>
        <li>Something</li>
        <li>SomethingElse</li>
      </ul>
    </div>
  );
}

export default EnterRealm;
