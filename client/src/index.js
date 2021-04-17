import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ThemeProvider from './core/ThemeContext';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);