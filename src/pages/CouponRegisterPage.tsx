import React from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';
import { useAddCoupon } from '../api/coupon';
import { useNavigate } from 'react-router-dom';

const CouponRegisterPage = () => {
  const [userId, setUserId] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const { addCouponMutation } = useAddCoupon();
  const navigate = useNavigate();
  const handleRegister = () => {
    console.log('사용자 ID:', userId);
    console.log('쿠폰 기간:', duration);
    addCouponMutation.mutate({ month: duration, nickname: userId });
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
      {/* 페이지 제목 */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 4,
          color: '#6C35F6',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        쿠폰 등록
      </Typography>

      {/* 사용자 ID 입력 */}
      <TextField
        label="사용자 ID"
        variant="outlined"
        fullWidth
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* 기간 선택 드롭다운 */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ mb: 6 }} id="duration-label">
          기간 선택
        </InputLabel>
        <Select
          labelId="duration-label"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <MenuItem value="1qwer">1개월</MenuItem>
          <MenuItem value="3">3개월</MenuItem>
          <MenuItem value="6">6개월</MenuItem>
        </Select>
      </FormControl>

      {/* 등록 버튼 */}
      <Button
        variant="contained"
        fullWidth
        onClick={() => {
          handleRegister();
        }}
        sx={{
          background: 'linear-gradient(to right, #6C35F6, #9B5DF8)',
          color: '#fff',
          fontWeight: 'bold',
          '&:hover': {
            background: 'linear-gradient(to right, #5A2FD9, #8349D1)',
          },
          marginBottom: '10px',
        }}
      >
        등록
      </Button>
      <button
        onClick={() => {
          navigate('/couponlist');
        }}
      >
        쿠폰 등록 리스트
      </button>
    </Container>
  );
};

export default CouponRegisterPage;
