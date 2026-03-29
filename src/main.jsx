import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2800,
        style: {
          background: '#08162d',
          color: '#f8fbff',
          border: '1px solid rgba(77, 160, 255, 0.22)',
          boxShadow: '0 20px 40px rgba(5, 17, 34, 0.35)',
        },
      }}
    />
  </React.StrictMode>,
);
