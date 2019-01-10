import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { Coupon } from 'src/app/models/coupon';
import { CustomerBean } from 'src/app/models/customerbean';
import { CustomerApiService } from '../api/customer-api.service';
import { UtilService } from '../util.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerCupons: Coupon[];
  isDataReady: boolean = false;
  customerBean:CustomerBean;

  constructor(private router: Router, private customerApi: CustomerApiService, private util: UtilService, private http: HttpClient) {

  }

  public setCustomerData(customerId: Number) {
    const ob = this.customerApi.getCustomerData(customerId);
    ob.subscribe(
      customerBean => {
        this.customerBean=customerBean;
        sessionStorage.setItem('userName', customerBean.custName);
        sessionStorage.setItem("customerName", customerBean.custName);
        sessionStorage.setItem("customerId", String(customerBean.id));
        sessionStorage.setItem("customerBean", JSON.stringify(customerBean));
        this.router.navigate(['/customer-coupons']);
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

