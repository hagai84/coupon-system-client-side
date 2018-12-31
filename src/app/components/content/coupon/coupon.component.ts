import { Component, OnInit } from '@angular/core';
import { CouponService } from 'src/app/services/coupon.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  constructor(public coupon:CouponService, private cart:CartService, private router:Router) { }
  ngOnInit() {
  }

  addToCart(){
  this.router.navigate(['/cart']);
  this.cart.addToCart(this.coupon.couponData);  
  }
}
