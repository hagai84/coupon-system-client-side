import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/res/reources/customer.service';
import { CustomerBean } from 'src/app/models/customerbean';
import { CustomerApiService } from 'src/app/services/api/customer-api.service';
import { UtilService } from 'src/app/services/util.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  customerBean: CustomerBean
  public myStorage: Storage = sessionStorage;
  constructor(private router: Router, 
              public loginService: LoginService, 
              private util: UtilService, 
              private customerApiService: CustomerApiService, 
              public customerService: CustomerService) { }

  ngOnInit() {
    this.customerBean = JSON.parse(sessionStorage.getItem("customerBean"));
  }

  updateData() {
    const ob = this.customerApiService.updateCustomer(this.customerBean);
    ob.subscribe(
      () => {
        this.customerService.setCustomerData(Number(sessionStorage.getItem("customerId")));
        localStorage.setItem('profileUpdated', Date.now().toString());
        alert("customer profile sucsessfully updated");
        this.router.navigate(["/customer-coupons"]);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }
  
  deleteCustomer(){
    const ob = this.customerApiService.deleteCustomer(sessionStorage.getItem("customerId"));
    ob.subscribe(
      () => {
        this.loginService.logout();
        alert("customer deleted sucsessfully")
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });


  }

}
