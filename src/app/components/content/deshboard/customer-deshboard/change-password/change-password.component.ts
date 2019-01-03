import { Component, OnInit } from '@angular/core';
import { CustomerApiService } from 'src/app/services/api/customer-api.service';
import { UtilService } from 'src/app/services/util.service';
import { CompanyApiService } from 'src/app/services/api/company-api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public oldPassword = "";
  public newPassword1 = "";
  public newPassword2 = "";
  constructor(public customerApiService: CustomerApiService, public companyApiService: CompanyApiService, public util: UtilService) { }

  ngOnInit() {
  }
  updateCustomerPassword(oldPassword, newPassword) {
    if (sessionStorage.getItem("userType") == "CUSTOMER") {
      const ob = this.customerApiService.updateCustomerPassword(oldPassword, newPassword);
      ob.subscribe(
        () => {
          console.log("update Customer password finish sucssesfuly");

        },
        error => {
          this.util.PrintErrorToCustomer(error);
        });
    }else if (sessionStorage.getItem("userType") == "COMPANY") {
      const ob = this.companyApiService.updateCompanyPassword(oldPassword, newPassword);
      ob.subscribe(
        () => {
          console.log("update company password finish sucssesfuly");

        },
        error => {
          this.util.PrintErrorToCustomer(error);
        });
    }
  }
}
