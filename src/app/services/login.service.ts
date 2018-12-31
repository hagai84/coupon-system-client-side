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
  public userId: Number = 0;


  constructor(private loginApi: LoginApiService, private util: UtilService, private cookieService: CookieService, private customerService: CustomerService, private router: Router) {
    this.checkLogin();
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

  public checkLogin() {
    const ob = this.loginApi.check();
    ob.subscribe(
      userBean => {
        // console.log(parseInt(checkBean.userName));
        this.afterLogIn(userBean.userId, userBean.userType);
      },
      error => {
        // console.log(error);
        this.router.navigate(['../coupons']);
      });
  }

  setIsLogin(isLogIn) {
    this.isLogIn = isLogIn;
  }
  setUserId(userId) {
    this.userId = userId;
  }
  setUserType(userType) {
    this.userType = userType;
  }

  afterLogIn(userId: Number, userType: string) {
    this.customerService.setCustomerData(userId);
    this.setUserId(userId);
    this.setUserType(userType);
    this.setIsLogin(true);
    // console.log('/'+userType.toLowerCase()+'-coupons');
    this.router.navigate(['/'+userType.toLowerCase()+'-coupons']);
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
