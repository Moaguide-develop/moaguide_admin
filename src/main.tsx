import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginMiddleware from './components/LoginMiddleware.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoginMiddleware>
        <App />
      </LoginMiddleware>
    </QueryClientProvider>
  </StrictMode>,
);
