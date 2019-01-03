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
import { CompanyService } from './company.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isFinishLogIn: boolean = false;

  constructor(private companyService: CompanyService, private http: HttpClient, private loginApi: LoginApiService, private util: UtilService, private cookieService: CookieService, private customerService: CustomerService, private router: Router) {
    // this.checkLogin();
  }

  async isLoggedIn():Promise<boolean> {
    this.isFinishLogIn=false;
    if (sessionStorage.getItem("isLogin")&&!localStorage.getItem("isLogin")) {
      sessionStorage.clear();
      return false;
    }
    if (sessionStorage.getItem("isLogin")&&localStorage.getItem("isLogin")) {
      console.log("isLogin");
      this.isFinishLogIn=true;
      return true;
    }
    if (!this.isFinishLogIn) {
      console.log("check");
      await this.checkLogin();
    }
    
    if (sessionStorage.getItem("isLogin")&&localStorage.getItem("isLogin")) {
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
        console.log(loginBean);
        loginBean.userId=userId;
        this.afterLogIn(loginBean);
        this.router.navigate(['/' + loginBean.userType.toLowerCase() + '-coupons']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
    }
    
    async checkLogin() {
      
      if(localStorage.getItem("rememberMe")||localStorage.getItem("isLogin")){
        const userBean = <LogInBean>await this.loginApi.check();
        console.log(userBean);
        
        if(userBean.userId!=-1){
          this.afterLogIn(userBean);
        }
      }
      this.isFinishLogIn = true;
    }
    
    
    
  afterLogIn(userBean:LogInBean) {
    if (userBean.userType == "CUSTOMER") {
      console.log(userBean.userId);
      
      this.customerService.setCustomerData(userBean.userId);
    }
    if (userBean.userType == "COMPANY") {
      this.companyService.setCompanyData(userBean.userId);
    }
    this.setUserId(userBean.userId);
    this.setUserType(userBean.userType);
    this.setIsLogin(true);
    localStorage.setItem("isLogin","true");
    if(userBean.rememberMe=="true"){
      localStorage.setItem("rememberMe","true");
    }
    console.log("isLogin4");

  }

  logout() {
    const ob = this.loginApi.logout();
    ob.subscribe(

      () => {
        sessionStorage.clear();
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("isLogin");
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
