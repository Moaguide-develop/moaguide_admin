export interface Coupon {
  name: string;
  couponCode: string;
  createdAt: string;
  months: number;
  nickname: string;
  couponId: number;
  redeemed: boolean;
  redeemedAt: string | null;
}

export interface CouponListResponse {
  couponlist: Coupon[];
  page: number;
  size: number;
  total: number;
}
