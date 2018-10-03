import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import App from "./components/App";
import Login from "./components/Login";
import Overview from "./components/Overview";

const Routes = () => (
  <App>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/overview" component={Overview} />
      <Redirect from="*" to="/" />
    </Switch>
  </App>
);

export default Routes;
