import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Подключение стилей
import App from './App';

console.log('Root element:', document.getElementById('root'));

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
  console.log('App rendered');
} else {
  console.error('Root element not found!');
}