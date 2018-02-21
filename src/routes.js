import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import App from './components/App';
import Example from './components/Example';

const Routes = () => (
  <App>
    <Switch>
      <Route exact path="/" component={Example} />
      <Redirect from='*' to='/' />
    </Switch>
  </App>
);

export default Routes;
