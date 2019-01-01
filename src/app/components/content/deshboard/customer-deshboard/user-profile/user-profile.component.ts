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
customerBean:CustomerBean 
  constructor(public loginService:LoginService, private util: UtilService, private customerApiService:CustomerApiService, private customerService: CustomerService) { }

  ngOnInit() {
    this.customerBean = JSON.parse(sessionStorage.getItem("customerBean"));
  }
  
  updateData(){
    const ob = this.customerApiService.updateCustomer(this.customerBean);
    ob.subscribe(
      () => {
        this.customerService.setCustomerData(Number(sessionStorage.getItem("customerId")));
        this.customerBean = JSON.parse(sessionStorage.getItem("customerBean"));
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }

}
