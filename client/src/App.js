import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './core/MainRouter';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.css'

const App = () => (
  <BrowserRouter>
    <MainRouter />
  </BrowserRouter>
)

export default App;
