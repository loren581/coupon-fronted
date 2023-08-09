import {  CouponModel } from './Coupon'; // Assuming you have a separate Coupon interface

export interface CustomerModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  coupons: CouponModel[];
}
