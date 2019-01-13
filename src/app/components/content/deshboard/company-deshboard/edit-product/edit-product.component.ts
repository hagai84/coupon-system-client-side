import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';
import { CouponApiService } from 'src/app/services/api/coupon-api.service';
import { Coupon } from 'src/app/models/coupon';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public coupon:Coupon = new Coupon(0,"", new Date(), new Date(), 0, "", "", 0,null, 0);
  public create: boolean;
  public amountDelta: number;
  public imageFile: File;
  public myStorage :Storage = sessionStorage;
  public legendTitle:string;
  public width:any;
  public todayDateString:string = new Date().toISOString().split('T')[0];

  public couponTypes: string[] = [
    "RESTAURANTS",
    "ELECTRICITY",
    "FOOD",
    "HEALTH",
    "SPORTS",
    "CAMPING",
    "TRAVELLING"
  ];

  constructor(public util: UtilService, public router: Router, public couponApi: CouponApiService) {    
    
   }
  ngOnInit() {

    if(this.router.url=='/dashboard/create-product'){
      this.coupon.companyId = Number(sessionStorage.getItem('companyId'));
      this.create=true;
      this.legendTitle=" Create Coupon ";
      
    }else {
      this.coupon = JSON.parse(sessionStorage.getItem("lestCouponToUpdate"));
      this.create=false;
      this.legendTitle=" Edit Coupon ";
      this.coupon.startDate = this.coupon.startDate.toString().split('Z')[0];
      this.coupon.endDate = this.coupon.endDate.toString().split('Z')[0];
    }
    
  }

  public createProduct() {  
    const ob = this.couponApi.createCoupon(this.coupon);
    ob.subscribe(
      couponId => {
        alert("coupon added successfuly the new coupon id is: "+couponId);
        localStorage.setItem('createdCoupon', this.coupon.companyId.toString());
        this.router.navigate(['/company-coupons']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });   
  }

  public updateProduct() {
    const ob = this.couponApi.updateCoupon(this.coupon);
    ob.subscribe(
      couponId => {
        if(this.amountDelta!=null){
          this.updateProductAmount();
        }
        alert("coupon update successfuly");
        this.router.navigate(['/company-coupons']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }
  public updateProductAmount() {
    console.log("amount Delta  " + this.amountDelta);
    
    const ob = this.couponApi.updateCouponAmount(this.amountDelta, this.coupon.couponId);
    ob.subscribe(
      couponId => {
        // alert("amount update successfuly");
        this.router.navigate(['/company-coupons']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }
  onFileChanged(event) {
    this.imageFile=<File>event.target.files[0]; 
    this.uploadImage();     
  }

  deleteCoupon(){
    const ob = this.couponApi.deleteCoupon(this.coupon.couponId);
    ob.subscribe(
      () => {
        alert("coupon deleted successfuly");
        this.router.navigate(['/company-coupons']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }

  uploadImage(){
    this.coupon.image = null;
    const localyGenFileName:string = (Math.random()*100000000000000000000).toString();
    const uploadData = new FormData();
        uploadData.append('pic', this.imageFile, localyGenFileName);
        const ob2 = this.couponApi.uploadImage(uploadData);
      ob2.subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.width = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            // alert("Image successfuly uploaded");
            this.coupon.image = localyGenFileName;
          }
        },
        error => {
          this.util.PrintErrorToCustomer(error);
        });
  }

  public extractFilename(path) {
    if (path.substr(0, 12) == "C:/fakepath/")
      return path.substr(12); // modern browser
    var x;
    x = path.lastIndexOf('/');
    if (x >= 0) // Unix-based path
      return path.substr(x+1);
    x = path.lastIndexOf('\\');
    if (x >= 0) // Windows-based path
      return path.substr(x+1);
    return path; // just the file name
  }
}
