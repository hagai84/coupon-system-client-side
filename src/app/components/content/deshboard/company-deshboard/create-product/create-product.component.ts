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
  public image: File;
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
    console.log(this.image);
    console.log(this.image.name);

    
    let coupon: Coupon = new Coupon(undefined, this.title, this.startDate, this.endDate, this.amount, this.type, this.message, this.price, this.image.name, Number(sessionStorage.getItem("userId")));

    const ob = this.couponApi.createCoupon(coupon);
    ob.subscribe(
      couponId => {
        alert("coupon added successfuly the new coupon id is: "+couponId);
        localStorage.setItem('createdCoupon', coupon.companyId.toString());
        this.router.navigate(['/company-coupons']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
      const uploadData = new FormData();
      
      uploadData.append('pic', this.image, this.image.name);
      const ob2 = this.couponApi.uploadImage(uploadData);
    ob2.subscribe(
      couponId => {
        alert("Image successfuly uploaded");
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

  onFileChanged(event) {
    
    // this.image = this.extractFilename(event.target.files[0]);
    // return val.replace( /C:\\fakepath\\/i, "" );
    console.log(event.target.files);
    
    this.image=<File>event.target.files[0];
    console.log(this.image);
    console.log(this.image.name);
    
  }
}

