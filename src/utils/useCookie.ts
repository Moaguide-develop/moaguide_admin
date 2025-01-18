import { Cookies } from 'react-cookie';

import { CookieGetOptions, CookieSetOptions } from '../types/cookies';

const cookies = new Cookies();

export const setCookie = (
  name: string,
  value: string,
  options?: CookieSetOptions,
) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string, options?: CookieGetOptions) => {
  return cookies.get(name, options);
};

export const removeCookie = (name: string, options?: CookieSetOptions) => {
  return cookies.remove(name, options);
};
