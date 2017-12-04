import React from 'react';
import { render } from 'react-dom';

// Charts Styling
import 'frappe-charts/dist/frappe-charts.min.css';

// Redux Setup
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combinedReducers from './reducers';

// Routes
import Routes from './routes';
// Root styles
import './style.css';

const store = createStore(combinedReducers);

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  // eslint-disable-next-line
  document.getElementById('root'),
);
