import { Container, Typography, TextField, Button } from '@mui/material';

import { useLogin } from '../hooks/useLogin';
import { useState } from 'react';
const LoginPage = () => {
  const { loginMutation } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 핸들러
  const handleLogin = () => {
    console.log('Login Attempt:', { email, password });

    // loginMutation 호출
    loginMutation.mutate({ email, password });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 4,
          color: '#6C35F6',
          fontFamily: 'Roboto, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        MOA GUIDE
        <div>ADMIN</div>
      </Typography>

      {/* 아이디 입력 */}
      <TextField
        label="아이디"
        variant="outlined"
        fullWidth
        value={email} // 상태 값 바인딩
        onChange={(e) => setEmail(e.target.value)} // 상태 업데이트
        onKeyDown={handleKeyDown} // Enter 키 이벤트 처리
        sx={{ mb: 2 }}
      />

      {/* 비밀번호 입력 */}
      <TextField
        label="비밀번호"
        type="password"
        variant="outlined"
        fullWidth
        value={password} // 상태 값 바인딩
        onChange={(e) => setPassword(e.target.value)} // 상태 업데이트
        onKeyDown={handleKeyDown} // Enter 키 이벤트 처리
        sx={{ mb: 2 }}
      />

      <Button
        onClick={handleLogin}
        variant="contained"
        fullWidth
        sx={{
          background: 'linear-gradient(to right, #6C35F6, #9B5DF8)',
          color: '#fff',
          mb: 2,
          fontWeight: 'bold',
          '&:hover': {
            background: 'linear-gradient(to right, #5A2FD9, #8349D1)',
          },
        }}
      >
        로그인
      </Button>
      {/* Footer Links */}
    </Container>
  );
};

export default LoginPage;
