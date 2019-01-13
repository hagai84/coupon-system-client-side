import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from 'src/app/models/coupon';
import { CartBean } from 'src/app/models/cartBean';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { UtilService } from '../util.service';

@Injectable({
  providedIn: 'root'
})
export class CouponApiService {
  
  constructor( private http : HttpClient, private utilService : UtilService) { }
  public getCoupons():Observable<Coupon[]>{
    return this.http.get<Coupon[]>(this.utilService.webServiceUrl + "/rest/coupons",{ withCredentials: true });
  }
  public createCoupon(coupon : Coupon):Observable<number>{
    return this.http.post<number>(this.utilService.webServiceUrl + "/rest/coupons",coupon,{ withCredentials: true });
  }
  public uploadImage(uploadData:FormData):Observable<HttpEvent<void>>{
    // return this.http.post<number>(this.utilService.webServiceUrl + "/rest/coupons",coupon,{ withCredentials: true });
     return this.http.post<void>(this.utilService.webServiceUrl + "/rest/coupons/uploadimage", uploadData,{ withCredentials: true, reportProgress: true,
      observe: 'events' });
  }
  public updateCoupon(coupon : Coupon):Observable<void>{
    return this.http.put<void>(this.utilService.webServiceUrl + "/rest/coupons",coupon,{ withCredentials: true });
  }
  public getCouponsByType(type:string):Observable<Coupon[]>{
    var urlString = this.utilService.webServiceUrl + "/rest/coupons/couponType?couponType="+type;
    return this.http.get<Coupon[]>(urlString,{ withCredentials: true });
  }
  public getCompanyCoupons(companyId : Number):Observable<Coupon[]>{
    let restUrl = this.utilService.webServiceUrl + "/rest/coupons/company/" + companyId;
    return this.http.get<Coupon[]>(restUrl,{ withCredentials: true });
  }
  public getCompanyCouponsByType(companyId:number, type:string):Observable<Coupon[]>{
    var urlString = this.utilService.webServiceUrl + "/rest/coupons/company/"+companyId+"/couponType?couponType="+type;
    return this.http.get<Coupon[]>(urlString,{ withCredentials: true });
  }
  public getCompanyCouponsByPrice(companyId:number, price:number):Observable<Coupon[]>{
    var urlString = this.utilService.webServiceUrl + "/rest/coupons/company/"+companyId+"/couponPrice?couponPrice="+price;
    return this.http.get<Coupon[]>(urlString,{ withCredentials: true });
  }
  public getCompanyCouponsByDate(companyId:number, date:Date):Observable<Coupon[]>{
    var urlString = this.utilService.webServiceUrl + "/rest/coupons/company/"+companyId+"/expirationDate?expirationDate="+date;
    return this.http.get<Coupon[]>(urlString,{ withCredentials: true });
  }
  public getCustomerCoupons(customerId : Number):Observable<Coupon[]>{
    let restUrl = this.utilService.webServiceUrl + "/rest/coupons/customer/" + customerId;
    return this.http.get<Coupon[]>(restUrl,{ withCredentials: true });
  }

  public getCustomerCouponsByType(customerId:number, type:string):Observable<Coupon[]>{
    var urlString = this.utilService.webServiceUrl + "/rest/coupons/customer/"+customerId+"/couponType?couponType="+type;
    return this.http.get<Coupon[]>(urlString,{ withCredentials: true });
  }

  public getCustomerCouponsByPrice(customerId:number, price:number):Observable<Coupon[]>{
    var urlString = this.utilService.webServiceUrl + "/rest/coupons/customer/"+customerId+"/couponPrice?couponPrice="+price;
    return this.http.get<Coupon[]>(urlString,{ withCredentials: true });
  }
  public purchaseCoupon(coupon: Coupon, customerId : Number): Observable<void> {
    var str = this.utilService.webServiceUrl + "/rest/coupons/"+ coupon.couponId + "/"+ customerId;
    return this.http.put<void>(str,{},{ withCredentials: true });
  }

  public checkoutCart(cartBean: CartBean, customerId : Number): Observable<CartBean> {
    var str = this.utilService.webServiceUrl + "/rest/coupons/cart/"+ customerId;
    return this.http.put<CartBean>(str,cartBean,{ withCredentials: true });
  }

  public deleteCoupon(couponId:number): Observable<void> {
    var url = this.utilService.webServiceUrl + "/rest/coupons/"+ couponId;
    return this.http.delete<void>(url,{ withCredentials: true });
  }
  public updateCouponAmount(amount:number, couponId : Number): Observable<void> {
    var str = this.utilService.webServiceUrl + "/rest/coupons/amount/"+ couponId + "?amount=" + amount;
    return this.http.put<void>(str,{},{ withCredentials: true });
  }
  
}
