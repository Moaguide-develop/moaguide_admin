import { useMutation } from '@tanstack/react-query';
import { CouponListResponse } from '../types/coupon';
import { apiClient } from './axiosInstance';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchinfinitecouponList = async ({
  pageParam = 1,
}: {
  pageParam: number;
}) => {
  try {
    const { data } = await apiClient.get<CouponListResponse>(
      `/coupon/admin/list?page=${pageParam}&size=20`,
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('api Error');
  }
};

export const InfiniteCouponList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['couponList'],
    queryFn: fetchinfinitecouponList,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.page;
      const totalPages = Math.ceil(lastPage.total / lastPage.size);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  };
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
