import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const navigate = useNavigate();
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

      <TextField label="아이디" variant="outlined" fullWidth sx={{ mb: 2 }} />

      <TextField
        label="비밀번호"
        type="password"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />

      <Button
        onClick={() => {
          console.log('login');
          navigate('/');
        }}
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
