import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  constructor() {
  
  }

  public setCoupon(coupon:Coupon){
    sessionStorage.setItem("lastSingleCoupon",JSON.stringify(coupon));
  }
}
