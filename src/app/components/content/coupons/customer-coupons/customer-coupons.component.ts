import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { UtilService } from 'src/app/services/util.service';
import { CouponApiService } from 'src/app/services/api/coupon-api.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-customer-coupons',
  templateUrl: './customer-coupons.component.html',
  styleUrls: ['./customer-coupons.component.css']
})
export class CustomerCouponsComponent implements OnInit {
  
  public coupons: Coupon[];


  constructor(private loginService: LoginService,private util: UtilService, private couponApiService: CouponApiService) { }

  ngOnInit() {
    console.log("Customercoupons ngOninit run");
    this.setCoupons();
  }

  setCoupons() {
    const ob = this.couponApiService.getCustomerCoupons(this.loginService.userId);
    ob.subscribe(coupons => {
      this.coupons = coupons;
    }, error => {
      this.util.PrintErrorToCustomer(error);
    });
  }


}

