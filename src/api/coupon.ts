import { useMutation, useQuery } from '@tanstack/react-query';
import { CouponListResponse } from '../types/coupon';
import { apiClient } from './axiosInstance';

const fetchcouponList = async ({ queryKey }: { queryKey: string[] }) => {
  const [, pageParam] = queryKey;
  try {
    const { data } = await apiClient.get<CouponListResponse>(
      `/coupon/admin/list?page=${pageParam}&size=10`,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const useCouponList = (pageParam: number = 1) => {
  const queryKey = ['couponList', pageParam.toString()];
  const { data } = useQuery({
    queryKey,
    queryFn: fetchcouponList,
  });

  return { data };
};

interface AddCouponParams {
  month: string;
  nickname: string;
}

const addCoupon = async ({ month, nickname }: AddCouponParams) => {
  try {
    const { data } = await apiClient.post(
      `coupon/issue?month=${month}&nickname=${nickname}`,
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('api Error');
  }
};

export const useAddCoupon = () => {
  const addCouponMutation = useMutation({
    mutationFn: addCoupon,
    onSuccess: () => {
      alert('쿠폰이 성공적으로 등록되었습니다!');
    },
    onError: () => {
      alert('쿠폰 등록에 실패했습니다.');
    },
  });

  return { addCouponMutation };
};
