import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CouponApiService } from 'src/app/services/api/coupon-api.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
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

  public couponType: string[] = [
    "RESTAURANTS",
    "ELECTRICITY",
    "FOOD",
    "HEALTH",
    "SPORTS",
    "CAMPING",
    "TRAVELLING"
  ];
  constructor(public util: UtilService, public router: Router, public couponApi: CouponApiService) { }
  ngOnInit() {
    console.log("create product componnet excecuted");
    
  }
  
  public createProduct() {
    console.log("create product method excecuted");
    let coupon: Coupon = new Coupon(undefined, this.title, this.startDate, this.endDate, this.amount, this.type, this.message, this.price, this.image, Number(sessionStorage.getItem("userId")));

    const ob = this.couponApi.createCoupon(coupon);
    ob.subscribe(
      couponId => {
        alert("coupon adedd successfuly the new coupon id is: "+couponId);
        localStorage.setItem('createdCoupon', coupon.companyId.toString());
        this.router.navigate(['/company-coupons']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }

}

