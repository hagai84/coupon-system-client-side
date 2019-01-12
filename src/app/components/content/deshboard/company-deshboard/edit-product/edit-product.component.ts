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
  public imageFile: File;
  public companyId: number;
  public myStorage :Storage = sessionStorage;


  constructor(public util: UtilService, public router: Router, public couponApi: CouponApiService) { }
  ngOnInit() {
    let coupon : Coupon = JSON.parse(sessionStorage.getItem("lestCouponToUpdate"));
   
   this.title = coupon.title
   this.couponId = coupon.couponId;
   this.startDate = coupon.startDate;
   this.endDate = coupon.endDate;
    this.amount = coupon.amount;
    this.type = coupon.type;
    this.message = coupon.message;
    this.price = coupon.price;
    this.image = coupon.image;
  }

  public updateProduct() {
    // this.updateProductAmount()
    let coupon: Coupon = new Coupon(this.couponId, this.title, this.startDate, this.endDate, this.amount, this.type, this.message, this.price, this.image.substr(12), Number(sessionStorage.getItem("userId")));
    const ob = this.couponApi.updateCoupon(coupon);
    ob.subscribe(
      couponId => {
        if(this.imageFile!=null){
          const uploadData = new FormData();
        uploadData.append('pic', this.imageFile, this.image);
        const ob2 = this.couponApi.uploadImage(uploadData);
      ob2.subscribe(
        couponId => {
          alert("Image successfuly uploaded");
        },
        error => {
          this.util.PrintErrorToCustomer(error);
        });
        }
        alert("coupon update successfuly");
        this.router.navigate(['/company-coupons']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }
  // public updateProductAmount() {
  //   let coupon: Coupon = new Coupon(this.couponId, this.title, this.startDate, this.endDate, this.amount, this.type, this.message, this.price, this.image, Number(sessionStorage.getItem("userId")));

  //   const ob = this.couponApi.updateCouponAmount(coupon);
  //   ob.subscribe(
  //     couponId => {
  //       alert("amount update successfuly");
  //       this.router.navigate(['/company-coupons']);
  //     },
  //     error => {
  //       this.util.PrintErrorToCustomer(error);
  //     });
  // }
  onFileChanged(event) {
    this.imageFile=<File>event.target.files[0];   
    // this.image = this.imageFile.name;
    // this.image = decodeURIComponent(escape(this.imageFile.name));    
  }

  deleteCoupon(){
    const ob = this.couponApi.deleteCoupon(this.couponId);
    ob.subscribe(
      () => {
        alert("coupon deleted successfuly");
        this.router.navigate(['/company-coupons']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }

}
