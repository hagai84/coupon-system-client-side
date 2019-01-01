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

  public isFinishLogIn: boolean = false;
  public isLogIn: boolean = false;
  public userType: string;
  public userId: Number = 0;


  constructor(private http: HttpClient, private loginApi: LoginApiService, private util: UtilService, private cookieService: CookieService, private customerService: CustomerService, private router: Router) {

  }


  public isLoggedIn() {
    console.log("login srvice, isLoggedIn");
    
    if (this.isFinishLogIn) {
      return this.isLogIn;
    }
    this.checkLogin();
    return this.isLogIn;
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

  async checkLogin() {
    console.log("login servise, checkLogin");

    const userBean = <LogInBean>await this.loginApi.check();
    console.log("user bean is: "+userBean);
    
    if (userBean.userId != 0) {
      console.log("login servise, checkLogin,if userBean.userId != null");
      
      this.afterLogIn(userBean.userId, userBean.userType);
    }
    this.isFinishLogIn = true;
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
    this.router.navigate(['/' + userType.toLowerCase() + '-coupons']);
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
