import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/index.css';
import { BrowserRouter as Router } from "react-router-dom";

const rootContainer: HTMLElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootContainer);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)
