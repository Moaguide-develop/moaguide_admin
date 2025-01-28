import { getCookie } from './useCookie';
export const isLoggedIn = () => {
  const token = getCookie('token');
  if (token) {
    return true;
  }
  return false;
};
