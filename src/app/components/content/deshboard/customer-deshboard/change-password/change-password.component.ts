import { Component, OnInit } from '@angular/core';
import { CustomerApiService } from 'src/app/services/api/customer-api.service';
import { UtilService } from 'src/app/services/util.service';
import { CompanyApiService } from 'src/app/services/api/company-api.service';
import { LogInBean } from 'src/app/models/logInBean';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public oldPassword = "";
  public newPassword1 = "";
  public newPassword2 = "";
  constructor(public customerApiService: CustomerApiService,
               public companyApiService: CompanyApiService, 
               private router:Router,
               public util: UtilService, ) { }

  ngOnInit() {
  }
  updateCustomerPassword(oldPassword, newPassword) {
    // var passwordBean:LogInBean=new LogInBean(Number(sessionStorage.getItem('userId')),oldPassword,newPassword);
    var passwordBean:LogInBean=new LogInBean();
    passwordBean.userName = oldPassword;
    passwordBean.userPassword = newPassword;
    passwordBean.userId=Number(sessionStorage.getItem('userId'));
    if (sessionStorage.getItem("userType") == "CUSTOMER") {
      const ob = this.customerApiService.updateCustomerPassword(passwordBean);
      ob.subscribe(
        () => {
          alert("Password was successfuly changed");
          this.router.navigate(["/customer-coupons"]);
        },
        error => {
          this.util.PrintErrorToCustomer(error);
        });
    }else if (sessionStorage.getItem("userType") == "COMPANY") {
      const ob = this.companyApiService.updateCompanyPassword(passwordBean);
      ob.subscribe(
        () => {
          alert("Password was successfuly changed");
          this.router.navigate(["/company-coupons"]);
        },
        error => {
          this.util.PrintErrorToCustomer(error);
        });
    }
  }
}
