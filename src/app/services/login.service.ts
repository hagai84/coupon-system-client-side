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
  }

  async isLoggedIn():Promise<boolean> {
    this.isFinishLogIn=false;
    if (sessionStorage.getItem("isLogin")){
      if(!localStorage.getItem("isLogin")) {
        sessionStorage.clear();
        //TODO shld refresh view
        await this.loginApi.check();
        // this.isFinishLogIn = true;
        return false;
      }else if(localStorage.getItem("userId")===sessionStorage.getItem("userId")&&
                localStorage.getItem("userType")===sessionStorage.getItem("userType")){
        this.isFinishLogIn=true;
        return true;
      }else{
        //TODO shld refresh view
        this.router.navigate(['/coupons']);
        await this.checkLogin();
        // this.isFinishLogIn = true;
        return false;
      }
    }else{
      return await this.checkLogin();
    }
    
  }
  
  public submitLogin(loginBean: LogInBean) {
    const ob = this.loginApi.login(loginBean);
    ob.subscribe(
      userId => {
        loginBean.userId=userId;
        this.afterLogIn(loginBean);
        this.router.navigate(['/' + loginBean.userType.toLowerCase() + '-coupons']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
    }
    
    async checkLogin():Promise<boolean> {
      
      if(localStorage.getItem("rememberMe")||localStorage.getItem("isLogin")){
        const userBean = <LogInBean>await this.loginApi.check();        
        if(userBean.userId!=-1){
          this.afterLogIn(userBean);
          this.isFinishLogIn = true;
          return true;
        }
      }else{
        this.isFinishLogIn = true;
        return false;
      }
    }
    
    
    
  afterLogIn(userBean:LogInBean) {
    if (userBean.userType == "CUSTOMER") {      
      this.customerService.setCustomerData(userBean.userId);
    }
    if (userBean.userType == "COMPANY") {
      this.companyService.setCompanyData(userBean.userId);
    }
    this.setUserId(userBean.userId);
    this.setUserType(userBean.userType);
    this.setIsLogin(true);
    if(userBean.rememberMe=="true"){
      localStorage.setItem("rememberMe","true");
    }
  }
  
  logout() {
    const ob = this.loginApi.logout();
    ob.subscribe(
      
      () => {
        sessionStorage.clear();
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("isLogin");
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");
        this.router.navigate(['../coupons']);
        
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
    }
    
    
    
    
    setIsLogin(isLogin: boolean) {
      sessionStorage.setItem("isLogin", String(isLogin));
      localStorage.setItem("isLogin","true");
    }
  setUserId(userId: Number) {
    sessionStorage.setItem("userId", String(userId));
    localStorage.setItem("userId", String(userId));

  }
  setUserType(userType: string) {
    sessionStorage.setItem("userType", userType);
    localStorage.setItem("userType", userType);

  }
}
