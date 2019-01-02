import { Injectable } from '@angular/core';
import { CustomerBean } from '../models/customerbean';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../models/coupon';
import { UtilService } from './util.service';
import { CustomerApiService } from './api/customer-api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerCupons: Coupon[];
  isDataReady: boolean = false;

  constructor(private router: Router, private customerApi: CustomerApiService, private util: UtilService, private http: HttpClient) {

  }

  public setCustomerData(customerId: Number) {
    console.log("set customer data excuted");
    
    const ob = this.customerApi.getCustomerData(customerId);
    ob.subscribe(
      customerBean => {
        sessionStorage.setItem("customerName", customerBean.custName);
        sessionStorage.setItem("customerId", String(customerBean.id));
        sessionStorage.setItem("customerBean", JSON.stringify(customerBean))
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }

  public register(customerbean: CustomerBean) {

    const ob = this.customerApi.createCustomer(customerbean);
    ob.subscribe(
      userId => {
        window.alert("register sucsses please login");
        this.router.navigate(['/login']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }


}

