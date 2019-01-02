import { Component, OnInit } from '@angular/core';
import { CustomerApiService } from 'src/app/services/api/customer-api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public oldPassword =""
  public newPassword1=""
  public newPassword2=""
  constructor(public customerApiService:CustomerApiService, public util:UtilService) { }

  ngOnInit() {
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
