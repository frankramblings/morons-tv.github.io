import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';
import { staticQueryClient, staticApiRequest } from './lib/staticQueryClient';

// Replace the real API with our static mock version
// This makes existing components work without modification
window.apiRequest = staticApiRequest;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={staticQueryClient}>
      <div className="flex flex-col min-h-screen">
        <App />
      </div>
    </QueryClientProvider>
  </React.StrictMode>,
);