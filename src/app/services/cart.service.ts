import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UtilService } from './util.service';
import { utils } from 'protractor';
import { CouponApiService } from './api/coupon-api.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Array<Coupon> = [];
  totalPrice: number = 0
  constructor(private loginService: LoginService, private util: UtilService, private router: Router, private http: HttpClient, private couponApiServise: CouponApiService) {
    if (JSON.parse(sessionStorage.getItem("cart"))) {
      this.cart = JSON.parse(sessionStorage.getItem("cart"));
      this.totalPrice = Number(sessionStorage.getItem("totalCartPrice"));
    }
  }


  public addToCart(coupon: Coupon) {
    this.cart.push(coupon);
    this.setTotalPrice();
    sessionStorage.setItem("cart", JSON.stringify(this.cart));
    sessionStorage.setItem("totalCartPrice", String(this.totalPrice));
  }
  public remove(coupon: Coupon) {
    var tempCart: Array<Coupon> = [];
    this.cart.forEach(element => {
      if (element != coupon) {
        tempCart.push(element);
      }
      this.cart = tempCart;
      this.setTotalPrice();
      sessionStorage.setItem("cart", JSON.stringify(this.cart));
      sessionStorage.setItem("totalCartPrice", String(this.totalPrice));
    });
  }
  public setTotalPrice() {
    var tempCart: Array<Coupon> = [];
    this.totalPrice = 0;
    this.cart.forEach(element => {
      this.totalPrice += element.price;
    });
  }
  public checkout() {
    while (this.cart.length > 0) {
      const coupon: Coupon = this.cart.pop();
      const ob = this.couponApiServise.purchaseCoupon(coupon, Number(sessionStorage.getItem("customerId")));
      ob.subscribe(
        () => {
          console.log("purchase sucsess");
          this.router.navigate(['/thank-you']);
          sessionStorage.setItem("cart", JSON.stringify(this.cart));
          sessionStorage.setItem("totalCartPrice", String(this.totalPrice));
        },
        error => {
          this.util.PrintErrorToCustomer(error);
          return;
        });
    }
  }



}
