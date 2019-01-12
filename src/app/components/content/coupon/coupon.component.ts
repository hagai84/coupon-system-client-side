import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  public mysessionStorage: Storage = sessionStorage;
  public coupon:Coupon
  constructor(private cart:CartService, private router:Router, public utilService:UtilService) { }
  ngOnInit() {
    this.coupon = JSON.parse(sessionStorage.getItem("lastSingleCoupon"));
  }

  addToCart(){
  this.router.navigate(['/cart']);
  this.cart.addToCart(JSON.parse(sessionStorage.getItem("lastSingleCoupon")));  
  }

  editCoupon(coupon) {
    sessionStorage.setItem("lestCouponToUpdate", JSON.stringify(coupon));
    this.router.navigate(['/dashboard/edit-product']);
  }
}
