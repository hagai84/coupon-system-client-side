import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public webServiceUrl : string = "http://ec2-18-222-31-108.us-east-2.compute.amazonaws.com:8080/couponby";
  // public webServiceUrl : String ="http://localhost:8080/Coupon_System_Web-App";
  public resourcesUrl:string = "/resources/coupons/"

  constructor() {
   }

  public PrintErrorToCustomer(error: HttpErrorResponse) {
    if (error.status > 1000) {
     
      window.alert(error.error.externalMessage);
    } else {
      window.alert(error.error);
    }
  }

}



    
    
    
