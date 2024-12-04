import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useCouponList } from '../api/coupon';
const CouponTable = () => {
  const { data } = useCouponList();
  console.log(data);

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
    </Paper>
  );
};

export default CouponTable;
