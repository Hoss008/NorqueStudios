import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactLenis } from 'lenis/react';
import App from './App.jsx';
import './index.css';
import 'lenis/dist/lenis.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReactLenis root options={{ autoRaf: true }}>
      <App />
    </ReactLenis>
  </React.StrictMode>
);
