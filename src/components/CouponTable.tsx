import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { useCouponList } from '../api/coupon';
import { useState } from 'react';

const CouponTable = () => {
  const [page, setPage] = useState(1);

  const { data } = useCouponList(page);

  const loadNextPage = async () => {
    setPage(page + 1);
  };

  const loadPreviousPage = async () => {
    setPage(page - 1);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>쿠폰 이름</TableCell>
              <TableCell>쿠폰 코드</TableCell>
              <TableCell>생성일</TableCell>
              <TableCell>개월 수</TableCell>
              <TableCell>닉네임</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.couponlist.map((row) => (
              <TableRow key={row.couponCode}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.couponCode}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.months}</TableCell>
                <TableCell>{row.nickname}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
        }}
      >
        <Button
          variant="contained"
          onClick={loadPreviousPage}
          disabled={page === 1}
        >
          이전
        </Button>
        <Button variant="contained" onClick={loadNextPage}>
          다음
        </Button>
      </div>
    </Paper>
  );
};

export default CouponTable;
