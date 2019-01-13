import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CookieService } from 'ngx-cookie-service';
import { UtilService } from 'src/app/services/util.service';
import { CouponApiService } from 'src/app/services/api/coupon-api.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { utils } from 'protractor';

@Component({
  selector: 'app-all-coupons',
  templateUrl: './all-coupons.component.html',
  styleUrls: ['./all-coupons.component.css']
})
export class AllCouponsComponent implements OnInit {
  public coupons: Coupon[] = [];
  public savedCoupons: Coupon[] = [];
  public keyWord:string;

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
    
    window.addEventListener('storage', (event)=>{
        if (event.key == 'purchased' && 
            localStorage.getItem('purchased')===sessionStorage.getItem('customerId')) {
          this.setCouponsToCustomerCoupons();
        }
        if (event.key == 'createdCoupon' && 
            localStorage.getItem('createdCoupon')===sessionStorage.getItem('companyId')) {
          this.setCouponsToCompanyCoupons();
        }
    });
  }

  setCouponsToAllSyteCoupons() {
    const ob = this.couponApiService.getCoupons();
    ob.subscribe(coupons => {
      this.savedCoupons=this.coupons = coupons;
    }, error => {
      this.util.PrintErrorToCustomer(error);
    });
  }

  setCouponsToCustomerCoupons() {
    const customerId = sessionStorage.getItem("customerId");
    if(customerId == null){
      this.router.navigate(['/coupons'])
    }
    const ob = this.couponApiService.getCustomerCoupons(Number(customerId));
    ob.subscribe(coupons => {
      this.savedCoupons=this.coupons = coupons;
    }, error => {
      this.util.PrintErrorToCustomer(error);
    });
  }

  setCouponsToCompanyCoupons() {
    const companyId = sessionStorage.getItem("companyId");
    if(companyId == null){
      this.router.navigate(['/coupons'])
    }
    const ob = this.couponApiService.getCompanyCoupons(Number(companyId));
    ob.subscribe(coupons => {
      this.savedCoupons=this.coupons = coupons;
    }, error => {
      this.util.PrintErrorToCustomer(error);
    });
  }

  getCouponsByType(filter: string){
    const ob = this.couponApiService.getCouponsByType(filter);
    ob.subscribe(coupons => {
      this.savedCoupons=this.coupons = coupons;
    }, error => {
      this.util.PrintErrorToCustomer(error);
    });
  }

  getCompanyCouponsByType(companyId:number, type: string){
    const ob = this.couponApiService.getCompanyCouponsByType(companyId, type);
    ob.subscribe(coupons => {
      this.savedCoupons=this.coupons = coupons;
    }, error => {
      this.util.PrintErrorToCustomer(error);
    });
  }

  getCompanyCouponsByPrice(companyId:number, price: number){
    const ob = this.couponApiService.getCompanyCouponsByPrice(companyId, price);
    ob.subscribe(coupons => {
      this.savedCoupons=this.coupons = coupons;
    }, error => {
      this.util.PrintErrorToCustomer(error);
    });
  }

  getCompanyCouponsByDate(companyId:number, expirationDate: Date){
    const ob = this.couponApiService.getCompanyCouponsByDate(companyId, expirationDate);
    ob.subscribe(coupons => {
      this.savedCoupons=this.coupons = coupons;
    }, error => {
      this.util.PrintErrorToCustomer(error);
    });
  }

  getCustomerCouponsByType(customerId:number, type: string){
    const ob = this.couponApiService.getCustomerCouponsByType(customerId, type);
    ob.subscribe(coupons => {
      this.savedCoupons=this.coupons = coupons;
    }, error => {
      this.util.PrintErrorToCustomer(error);
    });
  }

  getCustomerCouponsByPrice(customerId:number, price: number){
    const ob = this.couponApiService.getCustomerCouponsByPrice(customerId, price);
    ob.subscribe(coupons => {
      this.savedCoupons=this.coupons = coupons;
    }, error => {
      this.util.PrintErrorToCustomer(error);
    });
  }
  
  filter(type: string) {
    if(type=='All'){
      this.ngOnInit();
      return;
    }
    if(this.router.url=='/coupons'){
      this.getCouponsByType(type);
    }else if(this.router.url=='/company-coupons'){
      this.getCompanyCouponsByType(Number(sessionStorage.getItem('companyId')), type);
    }else if(this.router.url=='/customer-coupons'){
      this.getCustomerCouponsByType(Number(sessionStorage.getItem('customerId')), type);
    }
  }

  searchKeyWord(){
    this.keyWord.split(" ").forEach(keyword => {
      var tmpCoupons:Coupon[]=[];
      // if(this.keyWord==" "){
      //   this.coupons=this.c;
      //   this.keyWord='';
      //   return;
      // }
      this.coupons.forEach(element => {    
        if(element.title.toLowerCase().includes(keyword.toLowerCase())||
        element.message.toLowerCase().includes(keyword.toLowerCase())){
          tmpCoupons.push(element);
        }
      });   
      this.coupons=tmpCoupons;  
    });    
    this.keyWord='';
  }
  clearFilter(){
    this.coupons=this.savedCoupons;
  }
}

