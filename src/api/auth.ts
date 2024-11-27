import axios from 'axios';

export const auth = () => {
  const example = axios.get('/api/auth');

  return example;
};
