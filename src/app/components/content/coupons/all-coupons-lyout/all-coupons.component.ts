import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CookieService } from 'ngx-cookie-service';
import { UtilService } from 'src/app/services/util.service';
import { CouponApiService } from 'src/app/services/api/coupon-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-coupons',
  templateUrl: './all-coupons.component.html',
  styleUrls: ['./all-coupons.component.css']
})
export class AllCouponsComponent implements OnInit {
  public coupons: Coupon[];

  constructor(private router: Router, private util: UtilService, private couponApiService: CouponApiService, private cookieService: CookieService) { }

  ngOnInit() {
    if (this.router.url == "/coupons") {
      this.setCouponsToAllSyteCoupons();
    }else if(!sessionStorage.getItem('isLogin')){ 
      //shldnt happen
      alert("coupons not loggedin");  
      this.router.navigate(['../coupons']);
    }else if (this.router.url == "/customer-coupons") {
      this.setCouponsToCustomerCoupons();
    }else if (this.router.url == "/company-coupons") {
      this.setCouponsToCompanyCoupons();
    }
  }

  setCouponsToAllSyteCoupons() {
    const ob = this.couponApiService.getCoupons();
    ob.subscribe(coupons => {
      this.coupons = coupons;
    }, error => {
      this.util.PrintErrorToCustomer(error);
    });
  }

  setCouponsToCustomerCoupons() {
    const ob = this.couponApiService.getCustomerCoupons(Number(sessionStorage.getItem("userId")));
    ob.subscribe(coupons => {
      this.coupons = coupons;
    }, error => {
      this.util.PrintErrorToCustomer(error);
    });
  }

  setCouponsToCompanyCoupons() {
    const ob = this.couponApiService.getCompanyCoupons(Number(sessionStorage.getItem("userId")));
    ob.subscribe(coupons => {
      this.coupons = coupons;
    }, error => {
      this.util.PrintErrorToCustomer(error);
    });
  }

  filter(filter: string) {
  //   if (filter == "All") {
  //     this.setCoupons();
  //     return;
  //   }
  //   const ob = this.couponApiService.getCouponsByType(filter);
  //   ob.subscribe(coupons => {
  //     this.coupons = coupons;
  //   }, error => {
  //     this.util.PrintErrorToCustomer(error);
  //   });
  }


}

