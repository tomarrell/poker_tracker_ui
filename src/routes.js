import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import App from './components/App';
import EnterRealm from './components/EnterRealm';
import Overview from './components/Overview';

const Routes = () => (
  <Router>
    <App>
      <Route exact path="/" component={EnterRealm} />
      <Route path="/overview" component={Overview} />
    </App>
  </Router>
);

export default Routes;
