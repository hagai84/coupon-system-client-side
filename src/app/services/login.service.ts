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

  // public isFinishLogIn: boolean = false;
  constructor(private http: HttpClient, private loginApi: LoginApiService, private util: UtilService, private cookieService: CookieService, private customerService: CustomerService, private router: Router) {
    this.checkLogin();
  }

  // public isLoggedIn() {
  //   if (this.isFinishLogIn) {
  //     return;
  //   }
  //   this.checkLogin();
  //   this.isFinishLogIn = true;
  //   return;
  // }

  public submitLogin(loginBean: LogInBean) {
    const ob = this.loginApi.login(loginBean);
    ob.subscribe(
      userId => {
        this.afterLogIn(userId, loginBean.userType);
        this.router.navigate(['/' + loginBean.userType.toLowerCase() + '-coupons']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }

  checkLogin() {
    
    const ob = this.loginApi.check();
    ob.subscribe(
      userBean => {
        this.afterLogIn(userBean.userId, userBean.userType);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }



  afterLogIn(userId: Number, userType: string) {
    if (userType == "CUSTOMER") {
      this.customerService.setCustomerData(userId);
    }
    this.setUserId(userId);
    this.setUserType(userType);
    this.setIsLogin(true);
    this.util.refresgPublicData();
  }

  logout() {
    const ob = this.loginApi.logout();
    ob.subscribe(

      () => {
        sessionStorage.clear();
        this.router.navigate(['../coupons']);
        this.util.refresgPublicData();

      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }




  setIsLogin(isLogin: boolean) {
    sessionStorage.setItem("isLogin", String(isLogin));
  }
  setUserId(userId: Number) {
    sessionStorage.setItem("userId", String(userId));
  }
  setUserType(userType: string) {
    sessionStorage.setItem("userType", userType);
  }
}
