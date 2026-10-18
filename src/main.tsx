import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ignore WebSocket reconnection errors from Vite HMR in iframe dev environments
window.addEventListener('unhandledrejection', (event) => {
  const msg = event.reason?.message || String(event.reason || '');
  if (
    msg.includes('WebSocket') ||
    msg.includes('vite:ws') ||
    msg.includes('closed without opened')
  ) {
    event.preventDefault();
  }
});

window.addEventListener('error', (event) => {
  const msg = event.message || '';
  if (
    msg.includes('WebSocket') ||
    msg.includes('vite:ws') ||
    msg.includes('closed without opened')
  ) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(<App />);
