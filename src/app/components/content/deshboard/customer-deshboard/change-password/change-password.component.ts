import { Component, OnInit } from '@angular/core';
import { CustomerApiService } from 'src/app/services/api/customer-api.service';
import { UtilService } from 'src/app/services/util.service';
import { CompanyApiService } from 'src/app/services/api/company-api.service';
import { LogInBean } from 'src/app/models/logInBean';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

    console.log(this.router.url);
    
    var ob:Observable<void>;
    if(this.router.url==='/dashboard/change-password'){
      passwordBean.userId=Number(sessionStorage.getItem('userId'));
      if (sessionStorage.getItem("userType") == "CUSTOMER") {
         ob = this.customerApiService.updateCustomerPassword(passwordBean);
      }else if (sessionStorage.getItem("userType") == "COMPANY") {
         ob = this.companyApiService.updateCompanyPassword(passwordBean);
      // }else if (sessionStorage.getItem("userType") == "ADMIN") {
          // ob = this.companyApiService.updateAdminPassword(passwordBean);
      }
    }else if(this.router.url==='/dashboard/customer-Password'){
      passwordBean.userId=Number(sessionStorage.getItem('customerId'));
      ob = this.customerApiService.updateCustomerPassword(passwordBean);
    }else if(this.router.url==='/dashboard/company-Password'){
      passwordBean.userId=Number(sessionStorage.getItem('companyId'));
      ob = this.companyApiService.updateCompanyPassword(passwordBean);
    }
    ob.subscribe(
      () => {
        alert("Password was successfuly changed");
        this.router.navigate(["/coupons"]);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });        
  }
}
