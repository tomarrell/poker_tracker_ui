import React from "react";
import { render } from "react-dom";

// Charts Styling
import "frappe-charts/dist/frappe-charts.min.css";

// React-router-redux
import createHistory from "history/createBrowserHistory";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from "react-router-redux";

// Redux Setup
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import combinedReducers from "./reducers";
import rootSaga from "./rootSaga";

// Routes
import Routes from "./routes";
import Toast from "./components/Toast";
// Root styles
import "./style.css";

// React-router-redux setup
const history = createHistory();
const routeMiddleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line

const store = createStore(
  combinedReducers(routerReducer),
  composeEnhancers(applyMiddleware(sagaMiddleware, routeMiddleware))
);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Toast />
        <Routes />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
