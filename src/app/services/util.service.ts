import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public isLogin: Boolean;
  public customerName: String;

  constructor() {
    this.refresgPublicData();
   }

  public PrintErrorToCustomer(error: HttpErrorResponse) {
    if (error.status > 1000) {
      window.alert(error.error.externalMessage);
    } else {
      window.alert(error.error);
    }
  }

  refresgPublicData(){
    this.customerName = sessionStorage.getItem("customerName");
    this.isLogin = Boolean(sessionStorage.getItem("isLogin"));
  }
}



    
    
    
