
// react 17.0.2

import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import Routes from './Routes';
import LocaleProvider from './landing/LocaleProvider';

ReactDOM.render(
  <LocaleProvider>
    <Routes/>
  </LocaleProvider>,
  document.getElementById('root')
);

