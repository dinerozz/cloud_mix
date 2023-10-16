import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ReactDOM from 'react-dom/client';

import './index.css';
import { AppRoutes } from './AppRoutes';

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  </React.StrictMode>,
);
