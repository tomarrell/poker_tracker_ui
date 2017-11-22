import React from 'react';
import ReactDOM from 'react-dom';
import 'frappe-charts/dist/frappe-charts.min.css';

import Routes from './routes';
import './style.css';

ReactDOM.render(
  <Routes />,
  // eslint-disable-next-line
  document.getElementById('root'),
);
