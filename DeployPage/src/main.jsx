import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Dynamically handle basename for GitHub Pages subfolder (e.g. /NorqueStudios/) or root /
function getBasename() {
  if (typeof window === 'undefined') return '/';
  const pathname = window.location.pathname;
  if (/^\/NorqueStudios(\/|$)/i.test(pathname)) {
    return '/NorqueStudios';
  }
  return '/';
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={getBasename()}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
