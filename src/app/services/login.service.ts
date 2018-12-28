import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LogInBean } from '../models/logInBean';
import { HeaderComponent } from '../components/header/header.component';
import { CustomerService } from './customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from './util.service';
import { LoginApiService } from './api/login-api.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isLogIn: boolean = false;
  public userType: string;
  public userId: Number ;


  constructor(private loginApi: LoginApiService, private util: UtilService, private cookieService: CookieService, private customerService: CustomerService, private router: Router) {
    this.setUserId(this.userId = +this.cookieService.get("userId"));
    this.setUserType(this.cookieService.get("userType"));


    if (this.userId != 0) {
      console.log("the user id is :" + this.userId);
      console.log("is log");
      this.setIsLogin(true);
    }
  }

  public sumbitLogin(loginBean: LogInBean) {

    const ob = this.loginApi.login(loginBean);
    ob.subscribe(
      userId => {
        this.afterLogIn(userId, loginBean.userType);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }



  setIsLogin(isLogIn) {
    this.isLogIn = isLogIn;
  }
  setUserId(userId) {
    console.log("set user id is run and the id is : " + userId);

    this.userId = userId;
  }
  setUserType(userType) {
    this.userType = userType;
  }

  afterLogIn(userId: Number, userType: string) {
    this.customerService.setCustomerData(userId);
    this.setIsLogin(true);
    this.setUserId(userId);
    this.setUserType(userType);
    this.router.navigate(['/customer-coupons']);
  }

  logout() {
    

    const ob = this.loginApi.logout();
    ob.subscribe(
     
      () => {
        this.isLogIn = false;
        this.router.navigate(['../coupons']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }





}
