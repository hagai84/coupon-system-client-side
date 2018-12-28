import { Injectable } from '@angular/core';
import { CustomerBean } from '../models/customerbean';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coupon } from '../models/coupon';
import { UtilService } from './util.service';
import { CustomerApiService } from './api/customer-api.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerName:string;
  customerId:number;
  customerCupons:Coupon[];

  constructor(  private router: Router, private customerApi: CustomerApiService, private util: UtilService, private http: HttpClient) {
 
  }

  setCustomerData(customerId:Number){
    console.log("set customer data is on");
    
    const ob = this.customerApi.getCustomerData(customerId);
    ob.subscribe(
      customerData=> {
        this.customerName = customerData.custName
      this.customerId = customerData.id
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }

  register(customerbean:CustomerBean){
    
    const ob = this.customerApi.createCustomer(customerbean);
    ob.subscribe(
      userId=> {
        window.alert("register sucsses please login");
        this.router.navigate(['/login']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }
 

}

