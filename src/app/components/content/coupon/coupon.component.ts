import { Component, OnInit } from '@angular/core';
import { CouponService } from 'src/app/services/res/reources/coupon.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  public coupon:Coupon
  constructor(private cart:CartService, private router:Router) { }
  ngOnInit() {
    this.coupon = JSON.parse(sessionStorage.getItem("lastSingleCoupon"));
  }

  addToCart(){
  this.router.navigate(['/cart']);
  this.cart.addToCart(JSON.parse(sessionStorage.getItem("lastSingleCoupon")));  
  }
}
