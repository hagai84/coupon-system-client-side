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

  constructor(private http: HttpClient, private loginApi: LoginApiService, private util: UtilService, private cookieService: CookieService, private customerService: CustomerService, private router: Router) {
    // this.checkLogin();
  }

  async isLoggedIn():Promise<boolean> {
    if (sessionStorage.getItem("isLogin")) {
      console.log("isLogin");
      this.isFinishLogIn=true;
      return true;
    }
    if (!this.isFinishLogIn) {
      console.log("check");
      await this.checkLogin();
    }
    
    if (sessionStorage.getItem("isLogin")) {
      console.log("isLogin2");
      
      return true;
    }
    console.log("isLogin3");

    return false;
  }
  
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
    
    async checkLogin() {
      
      const userBean = <LogInBean>await this.loginApi.check();
      console.log(userBean.userId);
      
      if(userBean.userId!=-1){
        this.afterLogIn(userBean.userId, userBean.userType);
      }
      this.isFinishLogIn = true;
    }



  afterLogIn(userId: Number, userType: string) {
    if (userType == "CUSTOMER") {
      this.customerService.setCustomerData(userId);
    }
    this.setUserId(userId);
    this.setUserType(userType);
    this.setIsLogin(true);
    console.log("isLogin4");

  }

  logout() {
    const ob = this.loginApi.logout();
    ob.subscribe(

      () => {
        sessionStorage.clear();
        this.router.navigate(['../coupons']);

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
