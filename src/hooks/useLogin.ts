import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../utils/useCookie';
interface LoginParams {
  email: string;
  password: string;
}

const fetchLogin = async ({ email, password }: LoginParams) => {
  try {
    const response = await apiClient.post('/moaguide/admin/login', {
      email,
      password,
    });
    const { data } = response;
    const token = response.headers['authorization'];

    return { data, token: token };
  } catch {
    console.error('error');
    throw new Error('api Error');
  }
};

export const useLogin = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: fetchLogin,
    onSuccess: ({ data, token }) => {
      console.log('로그인 성공:', data);
      console.log('token Code:', token);
      alert('로그인 성공');
      localStorage.setItem('token', token);
      setCookie('token', token);
      navigate('/');
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      alert('로그인 실패');
    },
  });

  return { loginMutation };
};
