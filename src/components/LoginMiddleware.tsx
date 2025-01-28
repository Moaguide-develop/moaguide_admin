import { useEffect, ReactNode } from 'react';
import { isLoggedIn } from '../utils/isLoggedIn';

const LoginMiddleware: React.FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (!isLoggedIn() && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }, []);

  return <>{children}</>;
};

export default LoginMiddleware;
