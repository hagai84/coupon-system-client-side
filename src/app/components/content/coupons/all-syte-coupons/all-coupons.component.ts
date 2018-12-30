import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CookieService } from 'ngx-cookie-service';
import { UtilService } from 'src/app/services/util.service';
import { CouponApiService } from 'src/app/services/api/coupon-api.service';

@Component({
  selector: 'app-all-coupons',
  templateUrl: './all-coupons.component.html',
  styleUrls: ['./all-coupons.component.css']
})
export class AllCouponsComponent implements OnInit {
  public coupons: Coupon[];


  constructor(private util: UtilService, private couponApiService: CouponApiService, private cookieService: CookieService) { }

  ngOnInit() {
    console.log("allcoupons ngOninit run");
    this.setCoupons();
  }

  setCoupons() {
    const ob = this.couponApiService.getCoupons();
    ob.subscribe(coupons => {
      this.coupons = coupons;
    }, error => {
      this.util.PrintErrorToCustomer(error);
    });
  }

  filter(filter:string){
    if ( filter == "All"){
      this.setCoupons();
      return;
    }
    const ob = this.couponApiService.getCouponsByType(filter);
    ob.subscribe(coupons => {
      this.coupons = coupons;
    }, error => {
      this.util.PrintErrorToCustomer(error);
    });
  }


}

