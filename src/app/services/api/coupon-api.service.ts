import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from 'src/app/models/coupon';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CouponApiService {
  
  constructor(private http:  HttpClient) { }
  public getCoupons():Observable<Coupon[]>{
    return this.http.get<Coupon[]>("http://localhost:8080/Coupon_System_Web-App/rest/coupons",{ withCredentials: true });
  }
  public createCoupon(coupon : Coupon):Observable<number>{
    return this.http.post<number>("http://localhost:8080/Coupon_System_Web-App/rest/coupons",coupon,{ withCredentials: true });
  }
  public getCouponsByType(type:string):Observable<Coupon[]>{
    var urlString = "http://localhost:8080/Coupon_System_Web-App/rest/coupons/couponType?couponType="+type;
    return this.http.get<Coupon[]>(urlString,{ withCredentials: true });
  }
  public getCompanyCoupons(companyId : Number):Observable<Coupon[]>{
    let restUrl = "http://localhost:8080/Coupon_System_Web-App/rest/coupons/company/" + companyId;
    return this.http.get<Coupon[]>(restUrl,{ withCredentials: true });
  }
  public getCompanyCouponsByType(companyId:number, type:string):Observable<Coupon[]>{
    var urlString = "http://localhost:8080/Coupon_System_Web-App/rest/coupons/company/"+companyId+"/couponType?couponType="+type;
    return this.http.get<Coupon[]>(urlString,{ withCredentials: true });
  }
  public getCompanyCouponsByPrice(companyId:number, price:number):Observable<Coupon[]>{
    var urlString = "http://localhost:8080/Coupon_System_Web-App/rest/coupons/company/"+companyId+"/couponPrice?couponPrice="+price;
    return this.http.get<Coupon[]>(urlString,{ withCredentials: true });
  }
  public getCompanyCouponsByDate(companyId:number, date:Date):Observable<Coupon[]>{
    var urlString = "http://localhost:8080/Coupon_System_Web-App/rest/coupons/company/"+companyId+"/expirationDate?expirationDate="+date;
    return this.http.get<Coupon[]>(urlString,{ withCredentials: true });
  }
  public getCustomerCoupons(customerId : Number):Observable<Coupon[]>{
    let restUrl = "http://localhost:8080/Coupon_System_Web-App/rest/coupons/customer/" + customerId;
    return this.http.get<Coupon[]>(restUrl,{ withCredentials: true });
  }

  public getCustomerCouponsByType(customerId:number, type:string):Observable<Coupon[]>{
    var urlString = "http://localhost:8080/Coupon_System_Web-App/rest/coupons/customer/"+customerId+"/couponType?couponType="+type;
    return this.http.get<Coupon[]>(urlString,{ withCredentials: true });
  }

  public getCustomerCouponsByPrice(customerId:number, price:number):Observable<Coupon[]>{
    var urlString = "http://localhost:8080/Coupon_System_Web-App/rest/coupons/customer/"+customerId+"/couponPrice?couponPrice="+price;
    return this.http.get<Coupon[]>(urlString,{ withCredentials: true });
  }
  public purchaseCoupon(coupon: Coupon, customerId : Number): Observable<void> {
    var str = "http://localhost:8080/Coupon_System_Web-App/rest/coupons/"+ coupon.couponId + "/"+ customerId;
    return this.http.put<void>(str,{},{ withCredentials: true });
  }
 
}
