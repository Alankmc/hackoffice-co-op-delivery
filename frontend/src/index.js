import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import MainRouter from './pages/routes';

ReactDOM.render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
