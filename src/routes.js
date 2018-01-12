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
      <Route exact path="/poker_tracker_ui/" component={Login} />
      <Route path="/poker_tracker_ui/overview" component={Overview} />
    </App>
  </Router>
);

export default Routes;
