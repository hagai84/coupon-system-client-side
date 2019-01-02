import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerBean } from 'src/app/models/customerbean';
import { CustomerApiService } from 'src/app/services/api/customer-api.service';
import { UtilService } from 'src/app/services/util.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  customerBean: CustomerBean
  public myStorage: Storage = sessionStorage;
  constructor(public loginService: LoginService, private util: UtilService, private customerApiService: CustomerApiService, public customerService: CustomerService) { }

  ngOnInit() {
    this.customerBean = JSON.parse(sessionStorage.getItem("customerBean"));
  }

  updateData() {
    const ob = this.customerApiService.updateCustomer(this.customerBean);
    ob.subscribe(
      () => {
        this.customerService.setCustomerData(Number(sessionStorage.getItem("customerId")));
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }
  updateCustomerPassword(oldPassword,newPassword) {
    console.log("updateCustomer password as start");
    const ob = this.customerApiService.updateCustomerPassword(oldPassword,newPassword);
    ob.subscribe(
      customerBean => {
        console.log("updateCustomer password finish sucssesfuly");

      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });

  }

}
