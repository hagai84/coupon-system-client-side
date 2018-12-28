import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
public couponData:Coupon;
  constructor() {
  
  }

  setCoupon(coupon:Coupon){
    this.couponData = coupon;
  }
}
