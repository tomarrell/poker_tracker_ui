import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import App from './components/App';
import Login from './components/Login';
import Overview from './components/Overview';

const Routes = () => (
  <Router>
    <App>
      <Route exact path="/" component={Login} />
      <Route path="/overview" component={Overview} />
    </App>
  </Router>
);

export default Routes;
