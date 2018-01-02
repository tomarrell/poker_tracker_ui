import React from 'react';
import { render } from 'react-dom';

// Charts Styling
import 'frappe-charts/dist/frappe-charts.min.css';

// Redux Setup
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import combinedReducers from './reducers';
import rootSaga from './rootSaga';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

// Routes
import Routes from './routes';
// Root styles
import './style.css';

// React-router-redux setup
const history = createHistory();
const routeMiddleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line

// TODO https://github.com/reactjs/react-router-redux
const store = createStore(
  combinedReducers,
  composeEnhancers(
    applyMiddleware(sagaMiddleware, routeMiddleware),
  ),
);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);
