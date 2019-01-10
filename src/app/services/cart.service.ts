import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UtilService } from './util.service';
import { utils } from 'protractor';
import { CouponApiService } from './api/coupon-api.service';
import { LoginService } from './login.service';
import { CartBean } from '../models/CartBean';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Array<Coupon> = [];
  totalPrice: number = 0
  constructor(private loginService: LoginService, private util: UtilService, private router: Router, private http: HttpClient, private couponApiServise: CouponApiService) {
    this.readCart();
  }

  public readCart(){
    if (JSON.parse(localStorage.getItem("cart"))) {
      this.cart = JSON.parse(localStorage.getItem("cart"));
      this.totalPrice = Number(localStorage.getItem("totalCartPrice"));
    }else{
      this.cart = [];
    }
  }

  public addToCart(coupon: Coupon) {
    let buy:boolean=true;
    // this.readCart();
    this.cart.forEach(element => {    
      if(element.couponId === coupon.couponId){
        buy=false;
        alert("Can only purchase 1 unit of each product");
        this.router.navigate(['/coupons']);
      }
    });
    if(buy){
      this.cart.push(coupon);
      this.setTotalPrice();
      localStorage.setItem("cart", JSON.stringify(this.cart));
      localStorage.setItem("totalCartPrice", String(this.totalPrice));
    }
  }
  public remove(coupon: Coupon) {
    // this.readCart();
    var tempCart: Array<Coupon> = [];
    this.cart.forEach(element => {
      if (element.couponId != coupon.couponId) {
        tempCart.push(element);
      }
      this.cart = tempCart;
      this.setTotalPrice();
      localStorage.setItem("cart", JSON.stringify(this.cart));
      localStorage.setItem("totalCartPrice", String(this.totalPrice));
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
    const couponId:number[]=[];
    this.cart.forEach(element => {
      couponId.push(element.couponId);
    });
    const cartBean:CartBean = new CartBean(couponId,"REQUESTED");
    const ob = this.couponApiServise.checkoutCart(cartBean, Number(sessionStorage.getItem("customerId")));
    ob.subscribe(
      returnedCart => {
        if(returnedCart.status=='PURCHASED'){
          this.cart=[];
          localStorage.setItem('purchased', sessionStorage.getItem("customerId"));
          this.updateCart();
          alert("Cart was successfuly purchased");
          this.router.navigate(['/customer-coupons']);
        }else if(returnedCart.status=='UPDATED'){
          const tmpCart:Array<Coupon>=[];
          this.cart.forEach(element => {
            if(returnedCart.coupons.includes(element.couponId)){
              tmpCart.push(element);
            }
          });
          this.cart=tmpCart;
          this.updateCart();
          alert("Certain coupons could not be purchased\n The cart has been updated \n please authorize purchase thank you");
        }
      },
      error => {
        this.util.PrintErrorToCustomer(error);
        return;
      });
    
    // this.router.navigate(['/thank-you']);
    
    }
    
    public updateCart(){
      this.setTotalPrice();
      localStorage.setItem("cart", JSON.stringify(this.cart));
      localStorage.setItem("totalCartPrice", String(this.totalPrice));

    }

  public oldcheckout() {
    while (this.cart.length > 0) {
      const coupon: Coupon = this.cart.pop();
      const ob = this.couponApiServise.purchaseCoupon(coupon, Number(sessionStorage.getItem("customerId")));
      ob.subscribe(
        () => {
          localStorage.setItem("cart", JSON.stringify(this.cart));
          localStorage.setItem("totalCartPrice", String(this.totalPrice));
        },
        error => {
          this.util.PrintErrorToCustomer(error);
          return;
        });
      }
      this.router.navigate(['/thank-you']);
  }

}
