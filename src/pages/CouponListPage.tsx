import { Container, Typography } from '@mui/material';

import CouponTable from '../components/CouponTable';
import { useNavigate } from 'react-router-dom';
const CouponListPage = () => {
  const navigate = useNavigate();
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        height: '100vh',
        marginTop: '50px',
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
        쿠폰 리스트
      </Typography>
      <button
        onClick={() => {
          navigate('/coupon');
        }}
      >
        쿠폰 등록하러 가기
      </button>
      {/* 쿠폰 리스트 */}
      {/* <Box></Box> */}
      <CouponTable />
    </Container>
  );
};

export default CouponListPage;
