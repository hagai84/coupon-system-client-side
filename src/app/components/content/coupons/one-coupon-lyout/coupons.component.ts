import { Component, OnInit, Input } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CouponService } from 'src/app/services/res/reources/coupon.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  @Input() coupons: Coupon[];
  
  constructor(private cart:CartService, private couponService:CouponService, private router:Router) { }
  
  ngOnInit() {
    
  }
  goToCoupon(coupon){
    this.router.navigate(['/coupon']);
    this.couponService.setCoupon(coupon)
  }
  addToCart(coupon){
    this.router.navigate(['/cart']);
    this.cart.addToCart(coupon);  
    }
}
