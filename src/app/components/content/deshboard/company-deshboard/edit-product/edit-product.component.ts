import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';
import { CouponApiService } from 'src/app/services/api/coupon-api.service';
import { Coupon } from 'src/app/models/coupon';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public couponId: number;
  public title: string;
  public startDate: Date;
  public endDate: Date;
  public amount: number;
  public type: string;
  public message: string;
  public price: number;
  public image: string;
  public companyId: number;
  public myStorage :Storage = sessionStorage;


  constructor(public util: UtilService, public router: Router, public couponApi: CouponApiService) { }
  ngOnInit() {
    let coupon : Coupon = JSON.parse(sessionStorage.getItem("lestCouponToUpdate"));
    this.startDate = coupon.startDate;
    this.endDate = coupon.endDate;
    this.amount = coupon.amount;
    this.type = coupon.type;
    this.message = coupon.message;
    this.price = coupon.price;
  }

  public createProduct() {
    let coupon: Coupon = new Coupon(undefined, this.title, this.startDate, this.endDate, this.amount, this.type, this.message, this.price, this.image, Number(sessionStorage.getItem("userId")));

    const ob = this.couponApi.createCoupon(coupon);
    ob.subscribe(
      couponId => {
        alert("coupon adedd successfuly the new coupon id is: "+couponId)
        this.router.navigate(['/company-coupons']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }

}
