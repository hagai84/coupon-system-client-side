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
    // if(this.cookieService.check("myUserId")){
    //   this.setUserId(this.cookieService.get("myUserId"));
    //   this.setUserType(this.cookieService.get("myUserType"));
    // }

    // if (this.userId != 0) {
    //   console.log("the user id is :" + this.userId);
    //   console.log("is log");
    //   this.customerService.setCustomerData(this.userId);
    //   this.setIsLogin(true);
    // }
  }

  ngOnInit(){
    // var loginBean2 : LogInBean = new LogInBean("dfdfdf","dfdfdf","CUSTOMER","dfdfd");
    // this.sumbitLogin(loginBean2);
  }

  public sumbitLogin(loginBean: LogInBean) {
    console.log(loginBean);
    const ob = this.loginApi.login(loginBean);
    ob.subscribe(
      userId => {
        console.log(userId);
        this.afterLogIn(userId, loginBean.userType);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }

  public setIsLogin(isLogIn) {
    this.isLogIn = isLogIn;
  }
  public setUserId(userId) {
    console.log("set user id is run and the id is : " + userId);

    this.userId = userId;
  }
  public setUserType(userType) {
    this.userType = userType;
  }

  public afterLogIn(userId: Number, userType: string) {
    this.customerService.setCustomerData(userId);
    this.setIsLogin(true);
    this.setUserId(userId);
    this.setUserType(userType);
    // this.cookieService.set("myUserId", userId.toString());
    // this.cookieService.set("myUserType", userType);
    this.router.navigate(['/customer-coupons']);
  }

  public logout() {
    const ob = this.loginApi.logout();
    ob.subscribe(
     
      () => {
        this.isLogIn = false;
        // this.cookieService.delete("myUserId");
        // this.cookieService.delete("myUserType");
        this.router.navigate(['../coupons']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }





}
